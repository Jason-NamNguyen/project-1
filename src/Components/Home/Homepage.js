import HomepageVideo from "../../Assets/video-homepage.mp4"
const HomePage = () => {
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