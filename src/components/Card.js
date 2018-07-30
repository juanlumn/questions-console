import React, {Component} from 'react';

class QuestionForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      description: this.props.description,
      link: this.props.link,
      linkText: this.props.linkText,
    };
  }

  render() {
    return (
      <div className="card text-center">
        <div className="card-body">
          <h5 className="card-title">{this.state.title}</h5>
          <p className="card-text">{this.state.description}</p>
          <a href={this.state.link} className="btn btn-primary">{this.state.linkText}</a>
        </div>
      </div>
    );
  }
};

export default QuestionForm;
