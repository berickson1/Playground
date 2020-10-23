type JSSFontface = {
  /* some properties here, does not matter for repo */
};

type PropsFunc<Props extends object, T> = (props: Props) => T;

/**
 * Allows the user to augment the properties available
 */
interface SvgProperties<TLength = (string & {}) | 0> {
  baselineShift?: TLength;
  filter?: string & {};
}
export interface Properties<TLength = (string & {}) | 0>
  extends SvgProperties<TLength> {}

interface BaseCSSProperties extends Properties<number | string> {
  //NOTE: If this is just number, the example compiles
  //'@font-face'?: JSSFontface | JSSFontface[];
  test?: JSSFontface[];
}

interface CSSProperties extends BaseCSSProperties {
  // Allow pseudo selectors and media queries
  // `unknown` is used since TS does not allow assigning an interface without
  // an index signature to one with an index signature. This is to allow type safe
  // module augmentation.
  // Technically we want any key not typed in `BaseCSSProperties` to be of type
  // `CSSProperties` but this doesn't work. The index signature needs to cover
  // BaseCSSProperties as well. Usually you would use `BaseCSSProperties[keyof BaseCSSProperties]`
  // but this would not allow assigning React.CSSProperties to CSSProperties
  [k: string]: unknown | CSSProperties;
}

interface CreateCSSProperties<Props extends object = {}>
  extends BaseCreateCSSProperties<Props> {
  // Allow pseudo selectors and media queries
  [k: string]:
    | BaseCreateCSSProperties<Props>[keyof BaseCreateCSSProperties<Props>]
    | CreateCSSProperties<Props>;
}

type BaseCreateCSSProperties<Props extends object = {}> = {
  [P in keyof BaseCSSProperties]:
    | BaseCSSProperties[P]
    | PropsFunc<Props, BaseCSSProperties[P]>;
};

type StyleRules<Props extends object = {}> = Record<
  string,
  | CSSProperties
  // JSS property bag where values are based on props
  | CreateCSSProperties<Props>
>;

declare function createStyles<Props extends {}>(
  styles: StyleRules<Props>
): StyleRules<Props>;

// EXAMPLE USAGE STARTS
const fakeTypographyStyle: CSSProperties = 4 as any;

const brokenStyle = createStyles({
  sizeSmall: {
    ...fakeTypographyStyle, // This is simply a set of css styles - nothing relating to props
    height: "36px",
  },
});
const workingStyle2 = createStyles({
  sizeSmall: {
    ...fakeTypographyStyle, // This is simply a set of css styles - nothing relating to props
  },
});
const workingStyle = createStyles({
  sizeSmall: {
    height: "36px",
  },
});
// Typescript 4.0 agrees that these are equal - typescript 4.1 infers a different value on the record, even though they should be compatible
// This is a bit of a contrived example, but it's distilled down from a real material ui use-case
const expectedStyle1: typeof workingStyle = brokenStyle;
const expectedStyle2: typeof workingStyle = workingStyle2;
