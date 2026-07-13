import { Button, Input } from "@/components";
import { logout } from "@/features/auth/auth.slice";
import { updateAccountDetailsThunk, updateUserAvatarThunk } from "@/features/auth/auth.thunks";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

function Profile() {
  const [editMode, setEditMode] = React.useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // const { isLoading } = useSelector((state) => state.auth);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      reset({
        name: user?.name,
        email: user?.email,
      });
    }
  }, [user, reset]);

  const handleUpdateFormSubmit = async (data) => {
    const result = await dispatch(updateAccountDetailsThunk(data));
    if (updateAccountDetailsThunk.fulfilled.match(result)) {
      setEditMode(false);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;
    dispatch(updateUserAvatarThunk(file));
  };

  return (
    <section className="m-4 bg-zinc-800 text-shadow-olive-400 h-[555px] w-[555px] rounded-2xl ">
      <div className=" mb-5 bg-zinc-800 text-shadow-olive-400  rounded-2xl overflow-hidden flex justify-center">
        {!editMode ? (
          <div className="  p-4 flex flex-col items-center">
            <div className="group relative h-20 w-20 cursor-pointer" onClick={handleAvatarClick}>
              <img
                src={user?.avatar}
                alt="Avatar"
                className="h-full w-full rounded-full object-cover"
              />
              <div
                className="
                    absolute inset-0
                    flex items-center justify-center
                    rounded-full
                    bg-black/60
                    text-sm font-medium text-white
                    opacity-0
                    transition-opacity duration-200
                    group-hover:opacity-100
                    "
              >
                Edit Avatar
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleAvatarChange}
            />
            <h1 className="text-xl font-bold">{user?.name}</h1>
            <p className="text-zinc-400">{user?.email}</p>
            <div className="mt-5 flex gap-3">
              <Button
                onClick={() => {
                  dispatch(logout());
                }}
                className="mt-5 bg-red-500 hover:bg-red-600"
              >
                Logout
              </Button>
              <Button
                className="mt-5 bg-blue-500 hover:bg-blue-600"
                onClick={() => {
                  setEditMode(!editMode);
                }}
              >
                Edit Profile
              </Button>
            </div>
          </div>
        ) : (
          <div className="  p-4 flex flex-col items-center">
            <img className="h-20 w-20 rounded-full mb-5" src={user?.avatar} alt="Avatar" />
            <form onSubmit={handleSubmit(handleUpdateFormSubmit)}>
              <Input
                label="Name"
                {...register("name", { required: true })}
                className="bg-zinc-700 text-white placeholder:text-zinc-500 border border-zinc-500 mb-2"
              />
              <Input
                label="Email"
                {...register("email", { required: true })}
                className="bg-zinc-700 text-white placeholder:text-zinc-500 border border-zinc-500 mb-5"
              />
              <Button className="mr-3" type="submit">
                Update Profile
              </Button>
              <Button
                type="submit"
                onClick={() => {
                  setEditMode(false);
                }}
              >
                Cancel
              </Button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

export default Profile;
