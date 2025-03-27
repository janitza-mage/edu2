import image1 from "./1.jpg";
import image2 from "./2.jpg";
import image5 from "./5.jpg";
import image10 from "./10.jpg";
import image20 from "./20.jpg";
import image50 from "./50.jpg";
import image100 from "./100.jpg";
import image200 from "./200.jpg";
import image500 from "./500.jpg";
import image1000 from "./1000.jpg";
import image2000 from "./2000.jpg";
import image5000 from "./5000.jpg";

const map: Record<number, string> = {
    1: image1,
    2: image2,
    5: image5,
    10: image10,
    20: image20,
    50: image50,
    100: image100,
    200: image200,
    500: image500,
    1000: image1000,
    2000: image2000,
    5000: image5000,
};

export interface MoneyUnitProps {
    valueCents: number;
}

export function MoneyUnit(props: MoneyUnitProps) {
    const image = map[props.valueCents];
    return image ? <img src={image} alt={"" + props.valueCents} /> : <span>ERROR: {props.valueCents}</span>; 
}
