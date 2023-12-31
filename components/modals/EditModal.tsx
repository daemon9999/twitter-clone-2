import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "../Modal";
import Input from "../Input";
import ImageUpload from "../ImageUpload";

export default function EditModal() {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id as string);
  const editModal = useEditModal();
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    setProfileImage(currentUser?.profileImage || "");
    setCoverImage(currentUser?.coverImage || "");
    setName(currentUser?.name || "");
    setUsername(currentUser?.username || "");
    setBio(currentUser?.bio || "");
  }, [
    currentUser?.profileImage,
    currentUser?.coverImage,
    currentUser?.name,
    currentUser?.bio,
    currentUser?.username,
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    
    try {
      setIsLoading(true);
      await axios.patch("/api/edit", {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      });
      

      mutateFetchedUser();

      toast.success("Updated!");
      editModal.onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [
    editModal,
    name,
    username,
    bio,
    mutateFetchedUser,
    profileImage,
    coverImage,
  ]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label={'Upload profile image'}
      />
      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label={'Upload cover image'}
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
        value={name}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
        value={username}
      />
      <Input
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        disabled={isLoading}
        value={bio}
      />
    </div>
  );
  return (
    <Modal
      isOpen={editModal.isOpen}
      disabled={isLoading}
      onClose={() => editModal.onClose()}
      title="Edit your profile"
      onSubmit={onSubmit}
      actionLabel="Save"
      body={bodyContent}
    />
  );
}
