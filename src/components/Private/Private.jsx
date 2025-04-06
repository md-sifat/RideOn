import { useContext } from "react";
import { authContext } from "../AuthProvider/AuthProvider";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import PropTypes from "prop-types";


const Private = ({children}) => {
    const {user , loading , setLoading } = useContext(authContext);
    if(user){
        setLoading(false);
        return children;
    }
    if(loading){
        return <>
            <div className="text-4xl my-20 min-h-[40vh] text-red-800">
                Loading . . . And Please Login First to access this content
            </div>
        </>
    }
    toast.error("Please Login First to access this contents");

    return (
        <>
            <Navigate to={'/login'}></Navigate>
        </>
    );
};

Private.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Private;