import { BiWorld } from "react-icons/bi";
import { TbDeviceMobileCode } from "react-icons/tb";
import { GrNetwork } from "react-icons/gr";
import { Card } from "./Card";
import { MdOutlineDesignServices } from "react-icons/md";

export const CategoriesList = () => {
  return (
    <div className="lg:px-10 px-5 my-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-center xl:grid-cols-4 gap-5 relative z-40 lg:-mt-40">
        <Card
          icon={<BiWorld size={32} />}
          title="Web Development"
          description="By combining modern technologies such as HTML, CSS, JavaScript, and frameworks such as React or Laravel, web development becomes the main foundation in the digital world. Explore the limitless potential and present innovative solutions through the web world!"
        />
        <Card
          icon={<TbDeviceMobileCode size={32} />}
          title="Mobile Development"
          description="With a focus on ease of use, high performance, and attractive design, mobile developers are leveraging platforms like iOS and Android to bring digital experiences directly into the palm of the user's hand."
        />
        <Card
          icon={<GrNetwork size={32} />}
          title="Network Engineer"
          description="With a deep understanding of network protocols, hardware, and data security, they ensure that communications and information transfers run smoothly."
        />
        <Card
          icon={<MdOutlineDesignServices size={32} />}
          title="UI UX"
          description="UI/UX design is the process of creating a pleasant and intuitive user experience in interacting with digital products."
        />
      </div>
    </div>
  );
};
