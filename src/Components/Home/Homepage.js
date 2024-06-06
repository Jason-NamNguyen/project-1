import HomepageVideo from "../../Assets/video-homepage.mp4"
const HomePage = (props) => {
    return (
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source
                    src={HomepageVideo}
                    type="video/webm"
                />
            </video>
        </div>
    )
}
export default HomePage;