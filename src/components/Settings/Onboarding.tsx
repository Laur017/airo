import SmallLogo from "../../assets/logo-small.png";

interface OnboardingProps {
  handleOnboarding: (val: boolean) => void;
}
export default function Onboarding({ handleOnboarding }: OnboardingProps) {
  return (
    <div className="onboarding">
      <div className="onboarding__card">
        <span onClick={() => handleOnboarding(false)}>
          <svg
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.0867 5.65662L11.3137 10.4296L6.54074 5.65662C6.29665 5.41254 5.90094 5.41254 5.65685 5.65662C5.41277 5.90071 5.41277 6.29642 5.65685 6.54051L10.4298 11.3135L5.65685 16.0864C5.41277 16.3305 5.41277 16.7262 5.65685 16.9703C5.90094 17.2144 6.29665 17.2144 6.54074 16.9703L11.3137 12.1974L16.0867 16.9703C16.3308 17.2144 16.7265 17.2144 16.9706 16.9703C17.2146 16.7262 17.2146 16.3305 16.9706 16.0864L12.1976 11.3135L16.9706 6.54051C17.2146 6.29642 17.2146 5.90071 16.9706 5.65662C16.7265 5.41254 16.3308 5.41254 16.0867 5.65662Z"
              fill="white"
            />
          </svg>
        </span>
        <div className="onboarding__card-top">
          <div>
            <img src={SmallLogo} alt="Small Logo" />
            <p>by Grid Dynamics</p>
          </div>
          <span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="24 / basic / external-link">
                <path
                  id="icon"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.7042 13.7071L18.9971 6.41421V11H20.9971V3H12.9971V5H17.5829L10.29 12.2929L11.7042 13.7071ZM19 19V14H17V19H5V7H10V5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21H17C18.1046 21 19 20.1046 19 19Z"
                  fill="#7A1EFF"
                />
              </g>
            </svg>
          </span>
        </div>
        <div className="onboarding__card-bottom">
          <h2>Hi there!</h2>
          <p>
            <span>
              Let us introduce the AIRO by Grid Dynamics – the application’s
              ready to share with you the overall and parametrical information
              about the air condition in the selected area.
            </span>
            <span>
              It is the platform for collaboration. Users could add their own
              devices to share air condition statistics in their areas with
              other people.
            </span>
            <span>
              The goal of the application is to highlight the condition of our
              common environment and think about where we are now and what we
              would bring to new generations.
            </span>
          </p>
          <button onClick={() => handleOnboarding(false)} className="main-btn">
            <p>Ok, got it!</p>
          </button>
        </div>
      </div>
    </div>
  );
}
