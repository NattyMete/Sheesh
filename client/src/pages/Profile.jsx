import Sidebar from "../components/nav/SideBar";
import UserProfile from "../components/profile/UserProfile";

const Profile = () => {
    return (
        <div className="flex w-full h-full">
        <Sidebar />
        <UserProfile />
        </div>
    );
    }

export default Profile;