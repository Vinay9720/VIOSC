import { httpCommon } from "@/httpCommon";
import { setIsLoading } from "@/lib/store/slices/loader-module";
import { setUsersData } from "@/lib/store/slices/users-module";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

const userDataUrl = "/api/v1/users";

export const useHandleUsersData = () => {
  const dispatch = useDispatch();

  return async () => {
    dispatch(setIsLoading(true));
    try {
      const response = await httpCommon("GET", userDataUrl);
      dispatch(setUsersData(response.data.users));
    } catch (error) {
      console.error("Error occurred:", error);
    }
    dispatch(setIsLoading(false));
  };
};

export const useOnConfirm = () => {
  const dispatch = useDispatch();

  return async (id) => {
    const url = `/api/v1/users/${id}`;
    dispatch(setIsLoading(true));
    try {
      const response = await httpCommon("DELETE", url);
      if (response.status === 200) {
        try {
          const response = await httpCommon("GET", userDataUrl);
          dispatch(setUsersData(response.data.users));
          dispatch(setIsLoading(false));
        } catch (error) {
          console.log("Error occured:", error);
          dispatch(setIsLoading(false));
        }
      }
    } catch (error) {
      console.error("Error occurred:", error);
      dispatch(setIsLoading(false));
    }
  };
};

export const useDebouncedSearch = () => {
  const dispatch = useDispatch();

  return useCallback(
    debounce(async (value) => {
      dispatch(setIsLoading(true));
      try {
        const response = await httpCommon(
          "GET",
          `/api/v1/users?search=${value}`
        );
        dispatch(setUsersData(response.data.users));
      } catch (error) {
        console.error("Error occurred:", error);
      }
      dispatch(setIsLoading(false));
    }, 500),
    [dispatch]
  );
};

export const useSubmitForm = ({ createUrl, updateUrl, errorCallback }) => {
  const router = useRouter();

  const submitForm = async (formData, newUser) => {
    try {
      if (!newUser) {
        const id = formData.id;
        const editUrl = `${updateUrl}/${id}`;
        const response = await httpCommon("PUT", editUrl, formData);
        if (response.status === 200) {
          router.push("/users");
        }
      } else {
        const user = {
          user: {
            ...formData,
            password_confirmation: formData.password,
          },
        };
        const response = await httpCommon("POST", createUrl, user);
        if (response.status === 201) {
          router.push("/users");
        }
      }
    } catch (error) {
      errorCallback?.(error);
      console.log("Error submitting form:", error);
    }
  };

  return submitForm;
};
