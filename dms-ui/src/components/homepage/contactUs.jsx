import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ContactUs = () => {
  return (
    <div>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="row-lg-4">
                <div className="col">
                  <div className="h-100 bg-light rounded d-flex align-items-center p-5">
                    <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white box-55">
                      <FontAwesomeIcon
                        className="text-primary"
                        icon={faLocationDot}
                      />
                    </div>
                    <div className="ms-4">
                      <h5 className="mb-2">Address</h5>
                      <p className="mb-0">
                        Room 407
                        <br />
                        Student Union Building 6136 University Avenue
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <br />

              <div className="row-lg-4">
                <div className="col">
                  <div className="h-100 bg-light rounded d-flex align-items-center p-5">
                    <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white box-55">
                      <FontAwesomeIcon
                        className="text-primary"
                        icon={faPhone}
                      />
                    </div>
                    <div className="ms-4">
                      <h5 className="mb-2">Phone</h5>
                      <p className="mb-0">
                        <br />
                        902-494-2287
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="row-lg-4">
                <div className="col">
                  <div className="h-100 bg-light rounded d-flex align-items-center p-5">
                    <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white box-55">
                      <FontAwesomeIcon
                        className="text-primary"
                        icon={faEnvelope}
                      />
                    </div>
                    <div className="ms-4">
                      <h5 className="mb-2">Email</h5>
                      <p className="mb-0">multifaith@dal.ca</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                <div className="h-100">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2839.056715749988!2d-63.591149784569716!3d44.636757779099796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b5a2224d4285d0d%3A0x36b864ba4ed0ac4f!2sDalhousie%20Student%20Union!5e0!3m2!1sen!2sca!4v1648411020772!5m2!1sen!2sca"
                    width="600"
                    height="560"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
