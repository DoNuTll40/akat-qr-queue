import { faHospital } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment/moment";
import "moment/locale/th";

export default function Header() {
  return (
    <div className="bg-[#0e8c66] py-2">
      <div className="flex items-center justify-center sm:justify-between text-white max-w-[80rem] mx-auto">
        <div className="flex items-center gap-1 font-bold">
          <FontAwesomeIcon size="xl" icon={faHospital} />
          <p className="text-center text-2xl">โรงพยาบาลอากาศอำนวย</p>
        </div>
        <p className="hidden sm:block font-bold">{moment().locale("th").add(543, "year").format("วันที่ DD MMM YYYY เวลา HH:mm น.")}</p>
      </div>
    </div>
  )
}
