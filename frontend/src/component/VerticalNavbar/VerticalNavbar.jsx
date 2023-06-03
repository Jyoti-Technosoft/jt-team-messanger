import { useContext } from 'react';
import { ShowContext } from '../Context/Context';
import './VerticalNavbar.scss';

function VerticalNavbar() {

    const { showConversation, setShowConversation, theme, setTheme } = useContext(ShowContext);

    const changeTheme = () =>{
        console.log("change");
        setTheme((theme) => !theme);
        console.log(theme);
    }

    return (
        <>
            <nav className="nav flex-column text-center">
                <div className="site-logo mt-3 mb-5">
                    <a className="nav-link logo" href="#"><img src="https://images.freeimages.com/images/previews/09e/moon-art-1641879.png" alt="logo" /></a>
                    <a className="nav-link" href="#"><img src="https://cdn-icons-png.flaticon.com/512/176/176318.png" alt="" /></a>
                    <a className="nav-link" href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="" /></a>
                    <a className="nav-link" href="#"><img src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png" alt="" /></a>
                    <a className="nav-link" href="#"><img src="https://cdn-icons-png.flaticon.com/512/472/472371.png" alt="" /></a>
                    <a className="nav-link" onClick={changeTheme}><img src="https://cdn.icon-icons.com/icons2/2666/PNG/512/weather_sun_icon_161266.png" alt="" /></a>
                    <a className="nav-link user" href="#"><img src="https://www.w3schools.com/howto/img_avatar.png" alt="" /></a>
                </div>
            </nav>
        </>
    )
}

export default VerticalNavbar;