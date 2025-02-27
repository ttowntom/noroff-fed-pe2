import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";

import { NO_USER_IMG_URL } from "../../constants.js";
import useUserStore from "../../store/userStore.js";
import { putFn, queryClient } from "../../utils/http.js";
import Modal from "../Modal.jsx";
import InputTextField from "../InputTextField.jsx";
import InputTextArea from "../InputTextArea.jsx";
import Button from "../Button.jsx";
import Notification from "../Notification.jsx";
import Loading from "../Loading.jsx";

/**
 * Bio component that displays and allows editing of a user's profile information
 * @component
 * @param {Object} props
 * @param {Object} props.data - Query result containing profile data
 * @param {ProfileData} props.data.data - Profile information
 * @param {boolean} props.isSelf - Whether the profile belongs to the current user
 *
 * @example
 * function ProfilePage() {
 *   const { data, isSelf } = useProfile(username);
 *
 *   return (
 *     <Bio
 *       data={data}
 *       isSelf={isSelf}
 *     />
 *   );
 * }
 */
export default function Bio({ data, isSelf }) {
  const user = useUserStore((state) => state.user);
  const [avatarUrl, setAvatarUrl] = useState(data.data.avatar.url);
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

  /**
   * Opens the edit profile modal
   */
  function openModal() {
    setIsModalOpen(true);
  }

  /**
   * Closes the edit profile modal
   */
  function closeModal() {
    setIsModalOpen(false);
  }

  /**
   * Handles avatar URL changes and validation
   * @param {Event} e - Input change event
   */
  function handleAvatarUrlChange(e) {
    const newUrl = e.target.value;
    setAvatarUrl(newUrl || NO_USER_IMG_URL);
  }

  /**
   * Handles profile edit form submission
   * @param {Event} e - Form submission event
   */
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
        <button
          onClick={openModal}
          aria-label="Edit profile"
          className="absolute -top-2 right-4"
        >
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
          className="h-16 w-16 rounded-full object-cover"
        />
        <h1 className="break-all font-notoSerif text-4xl font-semibold sm:text-5xl">
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
          <div
            role="dialog"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            aria-modal="true"
            className="flex flex-col gap-4"
          >
            <h2 id="modal-title" className="text-2xl font-semibold">
              Edit Profile
            </h2>
            <form
              id="modal-description"
              onSubmit={handleEditProfile}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-wrap items-end gap-4">
                <div className="flex max-w-full flex-grow">
                  <InputTextField
                    label="Avatar"
                    name="avatar"
                    type="text"
                    defaultValue={
                      avatarUrl === NO_USER_IMG_URL ? "" : avatarUrl
                    }
                    onChange={handleAvatarUrlChange}
                    placeholder="Enter image URL"
                  />
                </div>
                <img
                  src={avatarUrl}
                  alt={data.data.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
              </div>
              <InputTextArea
                label="Bio"
                name="bio"
                defaultValue={data.data.bio}
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
                {!isPending ? (
                  <Button type="submit" disabled={isPending}>
                    Save
                  </Button>
                ) : (
                  <Loading />
                )}
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
}
