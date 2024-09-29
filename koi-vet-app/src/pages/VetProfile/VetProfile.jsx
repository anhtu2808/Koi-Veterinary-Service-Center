import React from "react";
import "./VetProfile.css";
import vet from "../../assets/img/veterinarian.png";

function VetProfile() {
  return (
    <div className="vet-profile-container container">
      <h1 className="vet-profile-title">Veterinarian Profile</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="vet-profile-left">
            <img src={vet} alt="Veterinarian" />
            <h2>Dr. Alexandros</h2>
          </div>
          <button className="vet-profile-previous mt-5">Previous Step</button>
        </div>

        <div className="col-md-6">
          <div className="vet-profile-right">
            <h5>Full name: Dr. Alexandros</h5>

            <h5>Specialization:</h5>
            <ul>
              <li>
                Veterinarian specializing in Koi fish and other freshwater
                ornamental fish.
              </li>
              <li>
                Expert in Koi health care and disease treatment, as well as
                providing advice on water quality management, nutrition, and
                fish habitats.
              </li>
            </ul>

            <h5>Education:</h5>
            <ul>
              <li>
                Graduated from Nong Lam University in Ho Chi Minh City with a
                degree in Veterinary Medicine.
              </li>
              <li>
                Completed specialized training in Koi fish care at the Japan
                Fisheries Research Institute.
              </li>
            </ul>

            <h5>Work Experience:</h5>
            <ul>
              <li>
                Over 10 years of experience in treating and caring for Koi fish
                diseases.
              </li>
              <li>
                Previously worked at leading Koi farms and ornamental fish care
                centers.
              </li>
              <li>
                Consultant for many Koi pond owners in urban areas and resort
                complexes.
              </li>
            </ul>

            <h5>Certifications and Credentials:</h5>
            <ul>
              <li>Licensed veterinarian.</li>
              <li>
                Specialized certification in Koi fish disease treatment from
                Japan and other advanced countries.
              </li>
            </ul>

            <h5>Awards and Achievements:</h5>
            <ul>
              <li>
                Named "Outstanding Koi Fish Veterinarian" at the 2020
                International Veterinary Conference.
              </li>
              <li>
                Awarded “Excellence in Koi Fish Community Contributions” by the
                Japan Koi Society.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VetProfile;
