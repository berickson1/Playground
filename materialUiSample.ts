import { createStyles, makeStyles, Theme, TypographyStyle } from '@material-ui/core';

const fakeTheme: Theme = 4 as any;
const fakeTypographyStyle: TypographyStyle = 4 as any;

const brokenStyle = createStyles({
    sizeSmall: {
        ...fakeTypographyStyle, // This is simply a set of css styles - nothing relating to props
        height: '36px',
    },
})
const workingStyle = createStyles({
    sizeSmall: {
        height: '36px',
    },
})
const workingStyle2 = createStyles({
    sizeSmall: {
        ...fakeTypographyStyle,
    },
})
const useStylesBroken = makeStyles(() => brokenStyle
);
const useStylesWorks = makeStyles(() => workingStyle
);
const useStylesWorks2 = makeStyles(() => workingStyle2);

export function NotReallyAButton(): null {
    console.log(useStylesBroken());
    console.log(useStylesWorks());
    console.log(useStylesWorks2());
    return null
}