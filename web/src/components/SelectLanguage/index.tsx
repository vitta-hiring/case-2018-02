import React, { useMemo } from "react";
import { Button, Dropdown, Icon, Menu } from "antd";
import { useTranslation } from "react-i18next";

import styles from "./theme/index.module.scss";

type Props = {
	className?: string;
};

const languageIcons: { [key: string]: string } = {
	en: "🇺🇸",
	pt: "🇧🇷"
};

const locales = ["en", "pt"];

const SelectLang: React.FC<Props> = ({ className }) => {
	const { t: translate, i18n } = useTranslation();

	const languageLabels: { [key: string]: string } = useMemo(
		() => ({
			en: translate("language.english"),
			pt: translate("language.portuguese")
		}),
		[translate]
	);

	const menu = (
		<Menu
			className={styles.menu}
			selectedKeys={[i18n.language]}
			onClick={({ key }) => i18n.changeLanguage(key)}
		>
			{locales.map(locale => (
				<Menu.Item key={locale}>
					<span role="img" aria-label={languageLabels[locale]}>
						{languageIcons[locale]}
					</span>{" "}
					{languageLabels[locale]}
				</Menu.Item>
			))}
		</Menu>
	);

	return (
		<Dropdown overlay={menu} placement="bottomRight">
			<Button
				className={className}
				type="link"
				title={translate("language.set")}
			>
				<Icon type="global" />
			</Button>
		</Dropdown>
	);
};

export default SelectLang;
