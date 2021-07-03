import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';

const filter = createFilterOptions();


class ComboBox extends React.Component{
    constructor(props){
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.controllableOptionLabel = this.controllableOptionLabel.bind(this);
    }

    onChange(event, value){
        if(this.props.onChange){
            this.props.onChange(value);
        }
    }

    onInputChange(event, value){
        if(this.props.onInputChange){
            this.props.onInputChange(value)
        }
    }

    controllableOptionLabel(value){
        let newValue;
        if(typeof value === 'object'){
            newValue = value[this.props.optionSelectedLabel];
        }
        else{
            newValue = value;
        }

        return newValue;
    }

    render(){

        const { 
            createTable, 
            options,
            value,
            inputValue,
            normalComboBox, 
            controllable, 
            label, 
            id, 
            style,
            fullWidth,
            required,
            variant,
            optionLabel,
            optionSelectedLabel,
            ...rest 
        } = this.props;

        return(
            <React.Fragment>
                {createTable &&
                    <Autocomplete
                     value={value}
                     onChange={(event, newValue) => {
                       if (typeof newValue === 'string') {
                        this.onChange(null, newValue)
                       } else if (newValue && newValue.inputValue) {
                         // Create a new value from the user input
                         this.onChange(null, newValue.inputValue)
                       } else {
                        this.onChange(null, newValue)
                       }
                     }}
                     filterOptions={(options, params) => {
                       const filtered = filter(options, params);
               
                       // Suggest the creation of a new value
                       if (params.inputValue !== '') {
                         filtered.push({
                           inputValue: params.inputValue,
                           title: `Add "${params.inputValue}"`,
                         });
                       }
               
                       return filtered;
                     }}
                     selectOnFocus
                     clearOnBlur
                     handleHomeEndKeys
                     id={id}
                     options={options}
                     getOptionLabel={(option) => {
                       // Value selected with enter, right from the input
                       if (typeof option === 'string') {
                         return option;
                       }
                       // Add "xxx" option created dynamically
                       if (option.inputValue) {
                         return option.inputValue;
                       }
                       // Regular option
                       return option[optionLabel];
                     }}
                     renderOption={(option) => option.title}
                     style={style}
                     freeSolo
                     renderInput={(params) => <TextField {...params} label={label} variant={variant} required fullWidth/>}
                   />
                }
                {normalComboBox &&
                    <Autocomplete
                        { ...rest }
                        id={id}
                        options={options}
                        getOptionLabel={(option) => option[optionLabel]}
                        onChange={this.onChange}
                        style={style}
                        renderInput={(params) => <TextField {...params} label={label} variant={variant} required fullWidth/>}
                    />
                }
                {controllable &&
                    <Autocomplete
                        { ...rest }
                        value={value}
                        onChange={this.onChange}
                        getOptionSelected={(option, value) => option[optionSelectedLabel] === value}
                        getOptionLabel={this.controllableOptionLabel}
                        // inputValue={inputValue}
                        // onInputChange={this.onInputChange}
                        id={id}
                        options={options}
                        style={style}
                        renderInput={(params) => <TextField {...params} label={label} variant={variant} required fullWidth/>}
                    />
                }
            </React.Fragment>
        )
    }
}

ComboBox.propTypes = {
    createTable: PropTypes.bool,
    normalComboBox: PropTypes.bool,
    controllable: PropTypes.bool,
    style: PropTypes.object,
    fullWidth: PropTypes.bool,
    required: PropTypes.bool,
    variant: PropTypes.string,
    optionLabel: PropTypes.string,
    value: PropTypes.string,
    inputValue: PropTypes.string,
}

ComboBox.defaultProps = {
    createTable: false,
    normalComboBox: false,
    controllable: false,
    style: { width: 300 },
    fullWidth: false,
    required: false,
    variant: "outlined",
    optionLabel: "",
    inputValue: "",
    value: "",
}

export default ComboBox;