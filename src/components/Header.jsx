import { faHospital } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  return (
    <>
      <p className="text-center text-2xl"><FontAwesomeIcon icon={faHospital} />โรงพยาบาลอากาศอำนวย</p>
    </>
  )
}
