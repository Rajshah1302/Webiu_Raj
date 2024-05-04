import React from "react"
import PropTypes from "prop-types"
import Accordion from "./Accordion"
import { Container } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons"
import "./style.sass"

export const Faq = ({ data, header, bgColor, toggleColor, titleColor }) => {
  return (
    <div>
      {header ? (
        <div className="header-component">
          <h3>
            <FontAwesomeIcon className="icon-h2" icon={faQuestionCircle} />{" "}
            {header}
          </h3>
        </div>
      ) : null}
      <Container className="faq-container">
        {data.length >= 1
          ? data.map((faq, index) => (
              <div key={index}>
                <Accordion
                  title={faq.title}
                  content={faq.content}
                  bgColor={bgColor}
                  toggleColor={toggleColor}
                  titleColor={titleColor}
                />
                <hr style={{ borderWidth: "0" }} />
              </div>
            ))
          : null}
      </Container>
    </div>
  )
}

Faq.defaultProps = {
  data: [],
  header: "",
  bgColor: "",
  toggleColor: "",
  titleColor: "",
}

Faq.propTypes = {
  data: PropTypes.array,
  header: PropTypes.string,
  bgColor: PropTypes.string,
  toggleColor: PropTypes.string,
  titleColor: PropTypes.string,
}
