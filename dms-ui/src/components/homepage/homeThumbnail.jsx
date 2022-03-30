const HomeThumbnail = () => {
  return (
    <div className="container-fluid header modal_background p-0 mb-5">
      <div className="row g-0 flex-column-reverse flex-lg-row">
        <div
          className="col-lg-6 p-5 wow fadeIn align-items-cente  "
          data-wow-delay="0.1s"
        >
          <h2 className="text-primary">
            <b>Dalhousie Multifaith Services</b>
          </h2>
          <h4 className="text-black">Taking care of your spiritual wellness</h4>
          <div className="text_justify mt-5">
            <b>Dalhousie Multifaith Services</b> offers an open door to all
            Dalhousie and King's students, staff, and faculty — no matter what
            their faith, philosophy, or doubt may be. We support the spiritual
            wellness of students and staff and the creation of safe space on
            campus. We do this by providing private counseling and immediate
            crisis response; promoting opportunities for inter-faith dialogue
            and spiritual development; working cooperatively with partners on
            and off campus; offering programs and events designed to develop
            respect and understanding between and among people of diverse
            spiritual and religious backgrounds.
          </div>
        </div>
        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
          <div className="owl-carousel header-carousel">
            <div className="owl-carousel-item position-relative">
              <img className="img-fluid" src={process.env.PUBLIC_URL + "peace.png"} alt="not able to find" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeThumbnail;
