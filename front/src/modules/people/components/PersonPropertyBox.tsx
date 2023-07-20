import {
  IconCalendar,
  IconMail,
  IconMap,
  IconPhone,
} from '@tabler/icons-react';

import { PropertyBox } from '@/ui/editable-field/property-box/components/PropertyBox';
import { DateEditableField } from '@/ui/editable-field/variants/components/DateEditableField';
import { PhoneEditableField } from '@/ui/editable-field/variants/components/PhoneEditableField';
import { TextEditableField } from '@/ui/editable-field/variants/components/TextEditableField';
import {
  Company,
  Person,
  useUpdateOnePersonMutation,
} from '~/generated/graphql';

import { PeopleCompanyEditableField } from '../editable-field/components/PeopleCompanyEditableField';

type OwnProps = {
  person: Pick<
    Person,
    'id' | 'city' | 'email' | 'displayName' | 'phone' | 'createdAt'
  > & {
    company?: Pick<Company, 'id' | 'name' | 'domainName'> | null;
  };
};

export function PersonPropertyBox({ person }: OwnProps) {
  const [updatePerson] = useUpdateOnePersonMutation();

  return (
    <PropertyBox extraPadding={true}>
      <TextEditableField
        value={person.email}
        icon={<IconMail />}
        placeholder={'Email'}
        onSubmit={(newEmail) => {
          updatePerson({
            variables: {
              where: {
                id: person.id,
              },
              data: {
                email: newEmail,
              },
            },
          });
        }}
      />
      <PhoneEditableField
        value={person.phone}
        icon={<IconPhone />}
        placeholder={'Phone'}
        onSubmit={(newPhone) => {
          updatePerson({
            variables: {
              where: {
                id: person.id,
              },
              data: {
                phone: newPhone,
              },
            },
          });
        }}
      />
      <DateEditableField
        value={person.createdAt}
        icon={<IconCalendar />}
        onSubmit={(newDate) => {
          updatePerson({
            variables: {
              where: {
                id: person.id,
              },
              data: {
                createdAt: newDate,
              },
            },
          });
        }}
      />
      <PeopleCompanyEditableField people={person} />
      <TextEditableField
        value={person.city}
        icon={<IconMap />}
        placeholder={'City'}
        onSubmit={(newCity) => {
          updatePerson({
            variables: {
              where: {
                id: person.id,
              },
              data: {
                city: newCity,
              },
            },
          });
        }}
      />
    </PropertyBox>
  );
}
