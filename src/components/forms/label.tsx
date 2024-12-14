import {colors, sizes} from '@/utils';
import {Text} from '../typography/Text';

interface Props {
  title?: string;
  required?: boolean;
}

export const Label = ({title, required}: Props) => {
  return (
    <Text style={{fontSize: sizes.body2, fontWeight: 600}}>
      {title}
      {required && (
        <Text weight="bold" style={{color: colors.tertiary600}}>
          *
        </Text>
      )}
    </Text>
  );
};
