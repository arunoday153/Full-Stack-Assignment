import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

export default function Course(props) {
  const [courseData, setcourse] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchedUnivName, setUnivName] = useState("");
  const [searchedLvlName, setLvlName] = useState("");
  const [searchedcountryName, setCountryName] = useState("");

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    let query = "http://localhost:3000/api/course";
    let isTextSearched = false;
    if (searchedcountryName) {
      query += `?country=${searchedcountryName}`;
      isTextSearched = true;
    }
    if (searchedUnivName) {
      if (isTextSearched) {
        query += `&university=${searchedUnivName}`;
      } else {
        query += `?university=${searchedUnivName}`;
        isTextSearched = true;
      }
    }
    if (searchedLvlName) {
      if (isTextSearched) {
        query += `&level=${searchedLvlName}`;
      } else {
        query += `?level=${searchedLvlName}`;
        isTextSearched = true;
      }
    }
    axios.get(query).then((res) => {
      if (res.status == 200 && res.data.status == "success") {
        setcourse(res.data.data);
        } else {
        setError(true);
      }
    });
  }

  function onChangeUnivName(e) {
    setUnivName(e.target.value);
  }

  function onChangeLevelName(e) {
    setLvlName(e.target.value);
  }

  function onChangeCountryName(e) {
    setCountryName(e.target.value);
  }

  function onKeyPress(e) {
    if (e.key == "Enter") {
      getData();
    }
  }

  return (
    <div className="main_div">
      <div className="heading">
        <span className="heading_span">
          <img
            src={require("../assets/text-wait-really.png")}
            className="wait_img"
          />
          We are making education more accessible for everyone
        </span>
      </div>

      <div className="heading">
        <span className="heading_span">
          <img
            src={require("../assets/text-future.png")}
            className="future_img"
          />
          Secure your scholarship today!
        </span>
      </div>

      <div className="heading">
        <span>We are on a mission to change the education industry</span>
      </div>

      <div className="section">
        <div className="section_input">
          <input
            type="text"
            className="section_textbox"
            onChange={(e) => {
              onChangeUnivName(e);
            }}
            value={searchedUnivName}
            onKeyPress={(e) => {
              onKeyPress(e);
            }}
            placeholder="Search university_name / course_name"
          />
          <input
            type="text"
            className="section_textbox"
            onChange={(e) => {
              onChangeLevelName(e);
            }}
            value={searchedLvlName}
            onKeyPress={(e) => {
              onKeyPress(e);
            }}
            placeholder="Search level_name"
          />
          <input
            type="text"
            className="section_textbox"
            onChange={(e) => {
              onChangeCountryName(e);
            }}
            onKeyPress={(e) => {
              onKeyPress(e);
            }}
            value={searchedcountryName}
            placeholder="Search country_name"
          />
        </div>

        {error ? (
          <span class="errorSpan">
              <p>Something went Wrong</p>
          </span>
        ) : (
          <div className="section_card">
            {courseData && courseData.length>0 ?
            courseData.map((course, index) => {
              return (
                <div className="card" key={course.course_id + " " + index}>
                  <div className="card_topSection">
                    <img
                      src={require("../assets/university_image.jpg")}
                      className="card_UniversityImage"
                    />
                    <img
                      src={require("../assets/miamiImage_final.png")}
                      className="card_UniversityLogo"
                    />
                  </div>

                  <div className="card_LowerSection">
                    <span className="card_title">{course.course_name}</span>
                    <span className="university_name">
                      {course.university_name}
                    </span>
                    <span className="country_name">{course.country_name}</span>

                    <span className="card_scholarship">
                      <p>{course.scholarship_name}</p>
                    </span>
                    <span className="scholarship_name">
                      English Language Test Fee Reimbursement
                    </span>

                    <div className="card_block">
                      <span className="card_block_text">Est. Tuition</span>
                      <span className="card_block_NA">
                        {course.annual_tuition}
                      </span>
                    </div>

                    <div className="card_block">
                      <span className="card_block_text">Course Duration</span>
                      <span className="card_block_NA"> &lt; 1 year</span>
                    </div>

                    <div className="card_button_block">
                      <button className="learn_more_btn">Learn More</button>
                      <button className="apply_now_btn">Apply Now</button>
                    </div>
                  </div>
                </div>
              );
            })
            :
            <div class="errorSpan">
              <div>No data found</div>
            </div>
          }
          </div>
        )}
      </div>
    </div>
  );
}
