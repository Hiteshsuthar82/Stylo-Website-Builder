import { Popover } from "@headlessui/react";
import { Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authslice";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.user)

  const profileWord = userData?.fullName.charAt(0).toUpperCase();
  

  const handleLogout =async () => {
    console.log('logout');
    
    dispatch(logout())
    navigate('/')
  }
  return (
      <div className="flex gap-8 ">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={`block text-xl font-semibold text-white h-[40px] w-[40px] rounded-full bg-orange-700`}
              >
                <div>{profileWord}</div>
              </Popover.Button>

              <Transition
                show={open}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-[-20px] z-10 mt-3 w-40 transform rounded-lg bg-black p-3 shadow-lg">
                  <div className="py-3">
                    <Link
                      className="block rounded-lg py-2 px-3 transition hover:bg-white/10"
                      to="/userProfile"
                    >
                      <p className="font-semibold text-white">Profile</p>
                    </Link>
                    <Link
                      className="block rounded-lg py-2 px-3 transition hover:bg-white/10"
                      to="/myWebsites"
                    >
                      <p className="font-semibold text-white">My Websites</p>
                    </Link>
                    <Link
                      className="block rounded-lg py-2 px-3 transition hover:bg-white/10"
                    >
                      <p className="font-semibold text-white" onClick={handleLogout}>Logout</p>
                    </Link>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        {/* <div className="text-sm font-semibold text-white/50">Pricing</div> */}
      </div>
  );
}

export default Profile;
