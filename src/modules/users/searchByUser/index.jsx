"use client";

import { CustomButton } from "@/lib/common/components";
import { setUserFormData } from "@/lib/store/slices/users-module";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Form, Input } from "reactstrap";

const UserSearchFilter = ({ onSearchhandler, userSearch }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleNewUserClick = () => {
    dispatch(
      setUserFormData({
        user_name: "",
        email: "",
        password: "",
      })
    );
    router.push("/users/new");
  };
  return (
    <>
      <style jsx>{`
        .main-search-container {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4rem;
        }
      `}</style>
      <div className="main-search-container">
        <Form>
          <Input
            id="search"
            name="search"
            placeholder="search by name, email"
            type="text"
            style={{ height: "50px", width: "700px" }}
            onChange={(e) => onSearchhandler(e)}
            value={userSearch}
          />
        </Form>
        <CustomButton onClick={handleNewUserClick}>New User</CustomButton>
      </div>
    </>
  );
};

export default UserSearchFilter;
