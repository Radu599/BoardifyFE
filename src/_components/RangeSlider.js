import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
        width: 300,
    },
});

function valuetext(value) {
    return `${value}°C`;
}

export default function RangeSlider(props) {
    const classes = useStyles();
    const {defaultValues, rangeValues} = props;
    const [value, setValue] = React.useState(defaultValues);


    const handleChange = (event, newValue) => {
        setValue(newValue);
        props.handleSliderChange(newValue);
    };

    return (
        <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
                {props.text}
            </Typography>
            <Slider
                min={rangeValues[0]}
                max={rangeValues[1]}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
            />
        </div>
    );
}
