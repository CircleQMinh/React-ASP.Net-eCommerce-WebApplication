import { LoadingScreen } from "../../../components/Loading";
import SlickSlider from "../../../components/SlickSlider/SlickSlider";
import { TitleNav } from "./TitleNav";
import "./styles.css";

export const SlickProducts = (props) => {
    const { products, title } = props;
    return (
        <>
            <div className={`containerDiv`}>
                <TitleNav title={title} />
                {products?.length > 0 ? <SlickSlider items={products} /> : <LoadingScreen />}
            </div>
        </>
    );
};
