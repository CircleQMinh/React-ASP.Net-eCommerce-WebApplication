import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Breadcrumb } from "../../components/BreadCrumb";
import { useNavigate } from "react-router-dom";
import styles from "./contact.module.css";

const ContactPage = (props) => {
  const navigate = useNavigate();
  const redirectRegister = () => {
    window.scrollTo(0, 0);
    navigate(`/register`);
  };
  return (
    <>
      <Header />
      <Breadcrumb list={[{ path: "/", name: "Home" }]} title="Contact" />
      <div style={{ position: "relative" }}>
        <img className={styles.image} src="/bookStore.jpg"></img>
        <div className={styles.titleContact}> Liên Hệ </div>
      </div>
      <div className={styles.bodyContact}>
        <div className={styles.infoWrapper}>
          <div className={styles.title}>Book Store</div>
          <div className={`${styles.content} mb-5`}>
            <span style={{ fontWeight: "bold" }}>Circle's Shop</span> is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry’s standard dummy text ever since the 1500s, when
            an unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries,
          </div>
          <div className="container pt-2">
            <div className={`row ${styles.rowWrapper}`}>
              <div className={`col-12 col-md-6 ${styles.colWrapper}`}>
                <div className={styles.title}> Liên hệ </div>
                <div className="d-flex">
                  <div className={styles.iconWrapper}>
                    <i class="fa-solid fa-location-dot"></i>
                  </div>
                  <div style={{ alignSelf: "center" }}>1 Võ Văn Ngân</div>
                </div>
                <div className="d-flex">
                  <div className={styles.iconWrapper}>
                    <i class="fa-solid fa-phone"></i>
                  </div>
                  <div style={{ alignSelf: "center" }}>0788283307</div>
                </div>
                <div className="d-flex">
                  <div className={styles.iconWrapper}>
                    <i class="fa-solid fa-earth-asia"></i>
                  </div>
                  <div style={{ alignSelf: "center" }}>
                    http://www.example.com
                  </div>
                </div>
              </div>
              <div className={`col-12 col-md-6 ${styles.colWrapper}`}>
                <div className={styles.title}> Link </div>
                <div className="d-flex">
                  <div className={styles.iconFacebook}>
                    <i class="fa-brands fa-facebook-f"></i>
                  </div>
                  <div style={{ alignSelf: "center" }}>Facebook</div>
                </div>
                <div className="d-flex">
                  <div
                    className={`${styles.iconWrapper} ${styles.twitterIcon}`}
                  >
                    <i class="fa-brands fa-twitter"></i>
                  </div>
                  <div style={{ alignSelf: "center" }}>Twitter</div>
                </div>
                <div className="d-flex">
                  <div className={`${styles.iconWrapper} ${styles.ggplusIcon}`}>
                    <i class="fa-brands fa-google-plus-g"></i>
                  </div>
                  <div style={{ alignSelf: "center" }}>Google Plus</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.promo}`}>
        <div className={styles.promoTitle}>
          Join 100,321 Happy readers And Get Access To Our Entire Collection Of
          1000 ebooks For The Price Of One
        </div>
        <div className={styles.promoTitleEnd}>
          We offer a 45 Day Money Back Guarantee, so joining is risk-free!
        </div>
        <button
          type="button"
          className={`btn btn-outline-light ${styles.btnOutlineLight}`}
          onClick={redirectRegister}
        >
          {" "}
          SIGN UP TODAY&nbsp; <i class="fa-solid fa-arrow-right"></i>{" "}
        </button>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
