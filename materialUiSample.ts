import { createStyles, makeStyles } from '@material-ui/core';

const useStylesBroken = makeStyles(theme =>
    createStyles({
        sizeSmall: {
            ...theme.typography.button, // This is simply a set of css styles - nothing relating to props
            height: '36px',
        },
    })
);
const useStylesWorks = makeStyles(theme =>
    createStyles({
        sizeSmall: {
            height: '36px',
        },
    })
);
const useStylesWorks2 = makeStyles(theme =>
    createStyles({
        sizeSmall: {
            ...theme.typography.button,
        },
    })
);

export function NotReallyAButton(): null {
    console.log(useStylesBroken());
    console.log(useStylesWorks());
    console.log(useStylesWorks2());
    return null
}