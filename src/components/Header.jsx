"use client";
// react
import { useEffect, useRef, useState } from "react";
// next js
import Link from "next/link";
import Image from "next/image";
// next auth
import { signIn, signOut, useSession } from "next-auth/react";
// react modal
import Modal from "react-modal";
// react icons
import { IoMdAddCircleOutline } from "react-icons/io";
import { HiCamera } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
// firebase
import { app } from "@/utils/firebaseConfig";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const Header = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);

  const filePickerRef = useRef(null);

  console.log(selectedFile);
  console.log(imageFileUrl);

  const addImageToPost = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  const uploadedImageToStorage = async () => {
    setImageFileUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + selectedFile.name;
    const storageRef = ref(storage, fileName);
    const uploadeTask = uploadBytesResumable(storageRef, selectedFile);
    uploadeTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
        setImageFileUploading(false);
        setImageFileUrl(null);
        setSelectedFile(null);
      },
      () => {
        getDownloadURL(uploadeTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setImageFileUploading(false);
        });
      }
    );
  };

  useEffect(() => {
    if (selectedFile) {
      uploadedImageToStorage(selectedFile);
    }
  }, [selectedFile]);

  return (
    <header className="shadow-sm border-b sticky top-0 bg-white z-30 p-3">
      <div className="flex justify-between items-center max-w-6xl mx-auto ">
        <Link href="/">
          <Image
            src="/text_logo.svg"
            width={50}
            height={10}
            alt="logo"
            priority
            className="hidden lg:inline-flex"
            style={{ width: "100px", height: "40px" }}
          />
          <Image
            src={"/logo.svg"}
            width={40}
            height={40}
            alt="logo"
            className="lg:hidden"
          />
        </Link>
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 px-4 max-w-[210px] focus:outline-none"
        />
        {session ? (
          <>
            <IoMdAddCircleOutline
              className="text-2xl cursor-pointer transform hover:scale-125 transition duration-500 hover:text-red-600"
              onClick={() => setIsOpen(true)}
            />
            <Image
              src={session.user.image}
              alt={session.user.name}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full cursor-pointer"
              onClick={signOut}
            />
          </>
        ) : (
          <button
            onClick={() => signIn()}
            className="text-sm font-semibold text-blue-500"
          >
            Log In
          </button>
        )}
      </div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          ariaHideApp={false}
          className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md"
        >
          <div>
            <div className="flex flex-col justify-center items-center h-[100%]">
              {selectedFile ? (
                <Image
                  src={imageFileUrl}
                  alt="image"
                  width={400}
                  height={400}
                  onClick={() => setSelectedFile(null)}
                  className={`cursor-pointer w-full max-h-[250px] object-cover ${
                    imageFileUploading ? "animate-pulse" : ""
                  }`}
                />
              ) : (
                <HiCamera
                  onClick={() => filePickerRef.current.click()}
                  className="text-5xl text-gray-500 cursor-pointer"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={addImageToPost}
                hidden
                ref={filePickerRef}
              />
            </div>
            <input
              type="text"
              maxLength={150}
              placeholder="Please enter your caption..."
              className="m-4 border-none text-center w-full focus:ring-0 outline-none"
            />
            <button
              disabled
              className="w-full bg-red-600 text-white p-2 shadow-md rounded-lg hover:brightness-105 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100"
            >
              Upload Post
            </button>
            <AiOutlineClose
              onClick={() => setIsOpen(false)}
              className="cursor-pointer absolute top-2 right-2 hover:text-red-600 transition duration-300"
            />
          </div>
        </Modal>
      )}
    </header>
  );
};

export default Header;
