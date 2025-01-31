import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";
import { NO_USER_IMG_URL } from "../../constants.js";
import useUserStore from "../../store/userStore.js";
import { putFn, queryClient } from "../../utils/http.js";
import Modal from "../Modal.jsx";
import InputTextField from "../InputTextField.jsx";
import Button from "../Button.jsx";
import Notification from "../Notification.jsx";

export default function bio({ data, isSelf }) {
  const user = useUserStore((state) => state.user);
  const login = useUserStore((state) => state.login);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const defaultImg =
    "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400";

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ({ avatar, bio, token }) =>
      putFn({
        url: `/holidaze/profiles/${user.name}`,
        body: { avatar: { url: avatar }, bio },
        token,
      }),
    onSuccess: (updatedProfile) => {
      // updatedProfile.data.avatar.url contains the new avatar URL
      login({
        ...user,
        avatar: updatedProfile.data.avatar.url,
      });

      queryClient.invalidateQueries({
        queryKey: [`/holidaze/profiles/${user.name}`],
      });
      closeModal();
    },
  });

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function handleEditProfile(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const avatar = formData.get("avatar");
    const bio = formData.get("bio");
    const token = user.token;

    mutate({ avatar, bio, token });
  }

  return (
    <div className="relative flex flex-col items-center gap-4 dark:text-dark-text-primary">
      {isSelf && (
        <button onClick={openModal} className="absolute -top-2 right-4">
          <FontAwesomeIcon
            icon={byPrefixAndName.fas[`pen-to-square`]}
            className="text-xl text-light-link-primary hover:opacity-80 dark:text-dark-link-primary"
          />
        </button>
      )}
      <div className="flex flex-wrap items-center gap-4">
        <img
          src={
            data.data.avatar.url === defaultImg
              ? NO_USER_IMG_URL
              : data.data.avatar.url
          }
          alt={data.data.name}
          className="h-16 w-16 rounded-full"
        />
        <h1 className="font-notoSerif text-4xl font-semibold sm:text-5xl">
          {data.data.name}
        </h1>
      </div>
      <p className="font-notoSerif text-lg">
        {data.data.bio
          ? data.data.bio
          : `${data.data.name} hasn't written a bio yet.`}
      </p>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">Edit Profile</h2>
            <form onSubmit={handleEditProfile} className="flex flex-col gap-4">
              <InputTextField
                label="Avatar"
                name="avatar"
                type="text"
                defaultValue={data.data.avatar.url}
              />
              <label htmlFor="bio" className="font-medium">
                Bio
              </label>
              <textarea
                className="h-40 w-full rounded-lg bg-light-bg-secondary p-4 text-light-text-primary dark:bg-dark-bg-secondary dark:text-dark-text-primary"
                defaultValue={data.data.bio}
                name="bio"
              />
              {isError && (
                <Notification type="error">
                  <p>{error.message}</p>
                </Notification>
              )}
              <div className="mt-4 flex justify-end gap-4">
                <button
                  onClick={closeModal}
                  className="text-light-text-primary hover:underline dark:text-dark-text-primary"
                >
                  Cancel
                </button>
                <Button type="submit" disabled={isPending}>
                  Save
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
}
