import { CustomButton } from "@/lib/common/components";
import { setLinkFormData } from "@/lib/store/slices/links-module";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Button, Form, Input } from "reactstrap";

const LinkSearchFilter = ({ searchByLink, setSearchByLink }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleNewLinkClick = () => {
    dispatch(
      setLinkFormData({
        uniqueid: "",
        url: "",
        notes: "",
        expires_at: "",
        is_qr_code: false,
        created_by_id: 1,
        domain: "http://localhost:3000",
      })
    );
    router.push("/links/new");
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
            placeholder="search by link, url, notes"
            type="text"
            style={{ height: "50px", width: "700px" }}
            value={searchByLink}
            onChange={setSearchByLink}
          />
        </Form>
        <CustomButton onClick={handleNewLinkClick}>New Link</CustomButton>
      </div>
    </>
  );
};

export default LinkSearchFilter;
