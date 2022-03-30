import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const aboutUs = () => {
  return (
    <div>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div className="wow fadeIn" data-wow-delay="0.5s">
              <p className="d-inline-block text-white bg-primary rounded-pill py-1 px-4">
                <b>What we do</b>
              </p>
              <h3 className="mb-4">
                Here are some of the services offered by us
              </h3>
              <p>
                <FontAwesomeIcon
                  className="text-primary me-3"
                  icon={faCircleCheck}
                />
                Chaplains offer confidential counselling on personal and
                spiritual issues on a drop-in basis and by appointment or online
              </p>
              <p>
                <FontAwesomeIcon
                  className="text-primary me-3"
                  icon={faCircleCheck}
                />
                host programs focused on spiritual wellness and spiritual
                practice
              </p>
              <p>
                <FontAwesomeIcon
                  className="text-primary me-3"
                  icon={faCircleCheck}
                />
                plan workshops, arts events, student retreats, social
                activities, and meals which contribute to a healthy,
                compassionate, and just campus environment
              </p>
              <p>
                <FontAwesomeIcon
                  className="text-primary me-3"
                  icon={faCircleCheck}
                />
                collaborate with university staff and students in response to a
                crisis on campus
              </p>
              <p>
                <FontAwesomeIcon
                  className="text-primary me-3"
                  icon={faCircleCheck}
                />
                Chaplains respond to confidential questions submitted to ‘Ask A
                Chaplain’
              </p>
              <p>
                <FontAwesomeIcon
                  className="text-primary me-3"
                  icon={faCircleCheck}
                />
                help students connect with specific local communities of faith
                and practice, and with interfaith activities in the area
              </p>
              <p>
                <FontAwesomeIcon
                  className="text-primary me-3"
                  icon={faCircleCheck}
                />
                participate in university events such as Orientation, community
                vigils, and campus
              </p>
              <p>
                <FontAwesomeIcon
                  className="text-primary me-3"
                  icon={faCircleCheck}
                />
                services of worship such as the annual Faculty of Medicine
                Service of Remembrance
              </p>
              <p>
                <FontAwesomeIcon
                  className="text-primary me-3"
                  icon={faCircleCheck}
                />
                upon request, provide religious rites and perform marriages
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default aboutUs;
