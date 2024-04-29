import { httpCommon } from "@/httpCommon";
import { setLinksData } from "@/lib/store/slices/links-module";
import { setIsLoading } from "@/lib/store/slices/loader-module";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

const linkDataUrl = "/api/v1/links";

export const useHandleLinksData = () => {
  const dispatch = useDispatch();

  return async () => {
    dispatch(setIsLoading(true));
    try {
      const response = await httpCommon("GET", linkDataUrl);
      dispatch(setLinksData(response.data.links));
    } catch (error) {
      console.log("Error occurred:", error);
    }
    dispatch(setIsLoading(false));
  };
};

export const useOnConfirm = () => {
  const dispatch = useDispatch();

  return async (id) => {
    dispatch(setIsLoading(true));
    try {
      const response = await httpCommon("DELETE", `/api/v1/links/${id}`);
      if (response.status === 200) {
        try {
          const response = await httpCommon("GET", linkDataUrl);
          dispatch(setLinksData(response.data.links));
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
          `/api/v1/links?search=${value}`
        );
        dispatch(setLinksData(response.data.links));
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

  const submitForm = async (formData, newLink) => {
    try {
      if (!newLink) {
        const id = formData.id;
        const editUrl = `${updateUrl}/${id}`;
        const response = await httpCommon("PUT", editUrl, formData);
        if (response.status === 200) {
          router.push("/links");
        }
      } else {
        const response = await httpCommon("POST", createUrl, formData);
        if (response.status === 201) {
          router.push("/links");
        }
      }
    } catch (error) {
      errorCallback?.(error);
      console.log("Error submitting form:", error);
    }
  };

  return submitForm;
};
