import { TFunction } from "next-i18next"
import CallWidget from "./buttons/CallWidget"
import ZaloWidget from "./buttons/ZaloWidget"
import ScrollToTopButton from "./buttons/ScrollToTopButton";
import MessengerWidget from "./buttons/MessengerWidget";
import ShowroomWidget from "./buttons/ShowroomWidget";


const Widgets = ({ t }: { t: TFunction }) => {
    return (
        <div className="fixed right-6 bottom-12 md:bottom-16 z-30 flex gap-8 flex-col items-center">
            <ShowroomWidget t={t}/>
            <MessengerWidget/>
            <CallWidget t={t}/>
            <ZaloWidget t={t}/>
            <ScrollToTopButton/>
        </div>
    )
};

export default Widgets;