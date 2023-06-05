import { useEffect, useState } from "react";

const useIsAuth = (isAuth) => {
    const [state, setState] = useState(isAuth);
    return { state }
}

export default useIsAuth;
