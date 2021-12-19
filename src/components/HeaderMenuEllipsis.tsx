import React, { } from 'react';
import { Menu, Divider, Button } from 'react-native-paper';
import useColorScheme from '../hooks/useColorScheme';

const HeaderMenuEllipsis = (props: any) => {

    const [visible, setVisible] = React.useState(false);
    const colorScheme = useColorScheme();

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<Button icon="dots-vertical" onPress={openMenu} />}>
            <Menu.Item
                icon="pencil-outline"
                onPress={() => {
                    closeMenu();
                    props.onEdit();
                }}
                title="Edit" />
            <Divider accessibilityComponentType={undefined} accessibilityTraits={undefined} />

            <Menu.Item
                icon="share"
                onPress={() => {
                    closeMenu();
                    props.onShare();
                }}
                title="Share Session" />
        </Menu>
    );
};

export default HeaderMenuEllipsis;