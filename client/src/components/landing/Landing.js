import React, { Component } from "react";
import axios from 'axios';
import "./Landing.css";
import { createShortUrl } from "../../APIHelper";
import constants from "../../config/constants";

const API_URL = `https://remoteroofbe.herokuapp.com/api/pdf`;
const url = `https://news.ycombinator.com/`
const localUrl = window.location.origin;
class Landing extends Component {
  constructor() {
    super();
    this.state = {
      showShortenUrl: false,
      shortenUrl: "",
      originalUrl: "",
      baseUrl: "",
      clickSubmit: true,
      showError: false,
      apiError: "",
      showApiError: false,
      showLoading: false,
      exUrl:
        "https://www.amazon.com/Apple-iPhone-GSM-Unlocked-5-8/dp/B075QMZH2L",
      exShortUrl: constants.baseUrl
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handlePdf = this.handlePdf.bind(this)
  }
  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }
  handlePdf(){
    return axios.get(`${API_URL}/?url=${url}`, {
      responseType: 'arraybuffer',
      headers: {
        'Accept': 'application/pdf'
      }
    });
  }

  async handleSave(){
    try {
      const todayDate = new Date();
      const pdfName = `${todayDate.getTime()}_Remote_Roofing_Report.pdf`;
        const response = await this.handlePdf() // API call
          ;
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = pdfName;
        link.click();
      }
      catch (err) {
        return console.log('>>>>>>', err);
      }
  }
   
  handleSubmit() {
    this.setState({ clickSubmit: true, showApiError: false });
    if (this.state.clickSubmit && this.state.originalUrl) {
      this.setState({ showLoading: true, showShortenUrl: false });
      let reqObj = {
        originalUrl: this.state.originalUrl,
        shortBaseUrl: constants.baseUrl
      };
      createShortUrl(reqObj)
        .then(json => {
          setTimeout(() => {
            this.setState({
              showLoading: false,
              showShortenUrl: true,
              shortenUrl: json.data.shortUrl
            });
          }, 0);
        })
        .catch(error => {
          this.setState({
            showLoading: false,
            showApiError: true,
            apiError: "Server Error"
          });
        });
    } else {
      this.setState({ showError: true });
    }
  }
  renderButton() {
    if (!this.state.showLoading) {
      return (
        <button
          className="btn waves-effect waves-light submit-btn"
          name="action"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      );
    } else {
      return (
        <div className="loader">
          <div className="preloader-wrapper small active">
            <div className="spinner-layer spinner-green-only">
              <div className="circle-clipper left">
                <div className="circle" />
              </div>
              <div className="gap-patch">
                <div className="circle" />
              </div>
              <div className="circle-clipper right">
                <div className="circle" />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="landing">
        <div>
          <h5> Original Url</h5>
        </div>
        <div>
          Ex:{" "}
          <a target="_blank" href={this.state.exUrl}>
            {this.state.exUrl}
          </a>
        </div>
        <input
          name="originalUrl"
          field="originalUrl"
          placeholder="Paste your link.."
          value={this.state.originalUrl}
          onChange={this.handleUserInput.bind(this)}
        />

        {this.state.showError && (
          <div className="formError">Original Url is required</div>
        )}

        <div>
          <h5>*Base Url</h5>
        </div>

        <input
          field="baseUrl"
          name="baseUrl"
          placeholder={this.state.exShortUrl}
          value={this.state.baseUrl}
          onChange={this.handleUserInput.bind(this)}
          disabled
        />
        {this.renderButton()}
        <button onClick={this.handleSave }>
          PRINT PDF
        </button>
        {this.state.showApiError && (
          <div className="shorten-error">{this.state.apiError}</div>
        )}
        {this.state.showShortenUrl && (
          <div className="shorten-title">
            Shortened Url is ->{` `}
            <a target="_blank" href={this.state.shortenUrl}>
              {this.state.shortenUrl}
            </a>
          </div>
        )}
        <div className="shorten-imp">
          [* Here base url has the default value{" "}
          <a target="_blank" href={this.state.exShortUrl}>
            {this.state.exShortUrl}
          </a>{" "}
          .This will change based on domain name]
        </div>
      </div>
    );
  }
}

export default Landing;
