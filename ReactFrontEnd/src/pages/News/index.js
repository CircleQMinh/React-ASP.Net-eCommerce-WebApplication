import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Breadcrumb } from "../../components/BreadCrumb";
import { useNavigate } from "react-router-dom";
import { NewItem } from "./components/new";
import styles from "./news.module.css";

export const NewsPage = (props) => {
  const navigate = useNavigate();
  const listItem = [
      {
        url: "https://cdn.shopify.com/s/files/1/0070/8991/3908/articles/2-270x178_93f3d606-d3d3-43e9-8ee0-a136048ccffc_412x240.jpg?v=1552315543",
        title: "How to Grow Epiphytic Tropical Plants",
        day: "11/02/2022",
        author: "Minh Mân",
        content: "Maria Denardo is the Fashion Director at theFashionSpot. Prior to joining tFS, she worked as the Site Director at Lifestyle Mirror and the Senior Fashion Editor at Fashion Week Daily."
      },
      {
          url: "https://cdn.shopify.com/s/files/1/0070/8991/3908/articles/1-270x178_83b1ad2f-a2ed-450b-9f5d-4b41596f1bc8_412x240.jpg?v=1552315430",
          title: "How To Pot Up and Care For Juvenile",
          day: "09/02/2022",
          author: "Minh Mân",
          content: "Virtual reality and 3-D technology are already well-established in the entertainment industry. Now, the fashion industry is not-so-slowly adopting the same cutting-edge tech in its eternal quest for something new",
      },
      {
          url: "http://alula2.demo.towerthemes.com/image/cache/catalog/blog/5-1110x717.jpg",
          title: "How to Water and Care for Mounted",
          day: "07/02/2022",
          author: "Minh Mân",
          content: "There's no need to soak your mounted bromeliad. Simply keep the central “cup” of the plant filled with water at all times. Each time you water your mount, dump out any standing water to keep it from getting funky, as dust and debris tend to accumulate in there. Using filtered water is best. If your bromeliad has a flower coming out of the central cup, simply water right around it.",
      },
      {
          url: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F20%2F2021%2F09%2F28%2FdeuxHoliday2021.jpg",
          title: "List of Pumpkin Spice Everything for 2022",
          day: "04/02/2022",
          author: "Minh Mân",
          content: "This vegan and gluten-free  can be enjoyed from the jar for an easy pumpkin snack or baked in the oven to warm someone up on a brisk fall day. Each jar is loaded with elderberry, zinc and fall flavors. "
      }
  ]
  return (
    <>
      <Header />
      <Breadcrumb list={[{ path: "/", name: "Home" }]} title="News" />
      <div className={styles.bodyNewsPage}>
        <div className={styles.title}>NEWS</div>
        <div className={styles.newsWrapper}>
            {listItem.map((item, index) =>
                  <NewItem item={item} key={`new-${index}`}/>
                )}
        </div>
      </div>
      <Footer />
    </>
  );
};
