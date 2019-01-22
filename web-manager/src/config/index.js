import dev from './dev';
import prod from './prod';

const NODE_ENV = process.env.NODE_ENV || 'development';
let config = {};

if (NODE_ENV === 'development') {
	config = dev;
} else if (NODE_ENV === 'production') {
	config = prod;
}

export default config
