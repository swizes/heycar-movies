import {
  PRIMARY_FONT_BOLD,
  PRIMARY_FONT_LIGHT,
  PRIMARY_FONT_REGULAR,
  PRIMARY_FONT_SEMI_BOLD,
} from '@/constants/fonts';
import metrics from '@/theme/metrics';

export default {
  h1: {
    fontFamily: PRIMARY_FONT_BOLD,
    fontSize: 30 * metrics.fontRem,
  },
  h2: {
    fontFamily: PRIMARY_FONT_BOLD,
    fontSize: 26 * metrics.fontRem,
  },
  h3: {
    fontFamily: PRIMARY_FONT_BOLD,
    fontSize: 22 * metrics.fontRem,
  },
  h4: {
    fontFamily: PRIMARY_FONT_BOLD,
    fontSize: 18 * metrics.fontRem,
  },
  s1: {
    fontFamily: PRIMARY_FONT_SEMI_BOLD,
    fontSize: 20 * metrics.fontRem,
  },
  s2: {
    fontFamily: PRIMARY_FONT_SEMI_BOLD,
    fontSize: 18 * metrics.fontRem,
  },
  p1: {
    fontFamily: PRIMARY_FONT_REGULAR,
    fontSize: 16 * metrics.fontRem,
  },
  p2: {
    fontFamily: PRIMARY_FONT_REGULAR,
    fontSize: 14 * metrics.fontRem,
  },
  p3: {
    fontFamily: PRIMARY_FONT_REGULAR,
    fontSize: 12 * metrics.fontRem,
  },
  p4: {
    fontFamily: PRIMARY_FONT_REGULAR,
    fontSize: 12 * metrics.fontRem,
  },
  c1: {
    fontFamily: PRIMARY_FONT_LIGHT,
    fontSize: 14 * metrics.fontRem,
  },
  c2: {
    fontFamily: PRIMARY_FONT_LIGHT,
    fontSize: 12 * metrics.fontRem,
  },
  c3: {
    fontFamily: PRIMARY_FONT_LIGHT,
    fontSize: 10 * metrics.fontRem,
  },
};
