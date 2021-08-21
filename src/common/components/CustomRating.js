import React from "react";
import Rating from "@material-ui/lab/Rating";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import { withStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import { updateAnswer } from "../../common/store/actions/answer/answer.actions";

const styles = {
  root: {
    display: "flex",
    alignItems: "center",
    width: 200,
  },
};

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: "Muy insatisfecho",
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: "Insatisfecho",
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: "Neutro",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: "Satisfecho",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: "Muy satisfecho",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

class CustomRating extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      hover: -1,
    };

    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRef = this.handleRef.bind(this);
  }

  onFieldChange(field, newValue) {
    this.setState({ [field]: newValue });
  }

  handleChange(event) {
    const { id, api, field } = this.props;

    api.setEditCellValue(
      { id, field, value: Number(event.target.value) },
      event
    );
    // Check if the event is not from the keyboard
    // https://github.com/facebook/react/issues/7407
    if (event.nativeEvent.clientX !== 0 && event.nativeEvent.clientY !== 0) {
      api.commitCellChange({ id, field });
      api.setCellMode(id, field, "view");
    }

    this.onFieldChange("value", Number(event.target.value));
    this.props.updateRating(
      Number(event.target.value),
      this.props.row.answerData
    );
  }

  handleRef(element) {
    if (element) {
      //element.querySelector(`input[value="${this.state.value}"]`).focus();
    }
  }

  render() {
    const { value, hover } = this.state;
    const { classes, readOnly } = this.props;

    return (
      <React.Fragment>
        {!readOnly && (
          <div className={classes.root}>
            <Rating
              name={`rating`}
              value={Number(value)}
              precision={1}
              onChange={this.handleChange}
              onChangeActive={(event, newHover) => {
                this.onFieldChange("hover", newHover);
              }}
              IconContainerComponent={IconContainer}
              ref={this.handleRef}
            />
            <Box ml={2}>{hover !== -1 && customIcons[hover]["label"]}</Box>
          </div>
        )}
        {readOnly && (
          <Rating
            readOnly
            value={value}
            IconContainerComponent={IconContainer}
          />
        )}
      </React.Fragment>
    );
  }
}

CustomRating.defaultProps = {
  readOnly: false,
};

CustomRating.propTypes = {
  /**
   * GridApi that let you manipulate the grid.
   */
  api: PropTypes.any.isRequired,
  /**
   * The column field of the cell that triggered the event
   */
  field: PropTypes.string.isRequired,
  /**
   * The grid row id.
   */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  /**
   * The cell value, but if the column has valueGetter, use getValue.
   */
  value: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ]),
};

export default withStyles(styles)(CustomRating);
