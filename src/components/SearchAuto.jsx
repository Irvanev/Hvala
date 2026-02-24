import React, { useMemo } from "react";
import { AutoComplete } from "antd";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FolderOutlined, FolderOpenOutlined } from "@ant-design/icons";

import { subcategories } from "../types/subcategories";

// Категории (value → { labelKey, route })
const CATEGORY_LIST = [
  { value: "estate", labelKey: "estate" },
  { value: "transport", labelKey: "transport" },
  { value: "electronics", labelKey: "electronics" },
  { value: "clothes", labelKey: "clothes" },
  { value: "shoes", labelKey: "shoes" },
  { value: "work", labelKey: "work" },
  { value: "house_goods", labelKey: "house_goods" },
  { value: "building_materials_and_tools", labelKey: "building_materials_and_tools" },
  { value: "transport_goods", labelKey: "transport_goods" },
  { value: "petSupplies", labelKey: "petSupplies" },
  { value: "home_appliance", labelKey: "home_appliance" },
  { value: "service", labelKey: "service" },
  { value: "child_goods", labelKey: "child_goods" },
  { value: "health_and_beauty", labelKey: "health_and_beauty" },
  { value: "sport", labelKey: "sport" },
  { value: "hobby_n_Relax", labelKey: "hobby_n_Relax" },
  { value: "rest", labelKey: "rest" },
];

// Пользовательские слова → категория или подкатегория (для поиска)
const SEARCH_KEYWORDS = {
  kuca: ["estate", "sale_estate", "rent_estate"],
  kuća: ["estate", "sale_estate", "rent_estate"],
  kuc: ["estate"],
  nekretnin: ["estate"],
  stan: ["estate", "sale_estate", "rent_estate"],
  telefon: ["electronics", "phones_and_tablets"],
  computer: ["electronics", "computers"],
  kompjuter: ["electronics", "computers"],
  komp: ["electronics", "computers"],
  auto: ["transport", "auto"],
  vozilo: ["transport"],
  posao: ["work", "vacancies"],
  rad: ["work"],
  obuc: ["shoes"],
  одежда: ["clothes"],
};

// Проверка: ввод похож на метку (вхождение, начало слова, префикс)
const matchesLabel = (label, input) => {
  if (!input || !label) return false;
  const lowerLabel = label.toLowerCase();
  const lowerInput = input.toLowerCase().trim();
  if (lowerInput.length < 2) return false;
  if (lowerLabel.includes(lowerInput)) return true;
  return lowerLabel.split(/\s+/).some((word) => word.startsWith(lowerInput));
};

const getKeywordMatches = (input) => {
  const lower = input.toLowerCase().trim();
  if (lower.length < 2) return [];
  const ids = new Set();
  for (const [keyword, targets] of Object.entries(SEARCH_KEYWORDS)) {
    if (keyword.includes(lower) || lower.includes(keyword)) {
      targets.forEach((t) => ids.add(t));
    }
  }
  return Array.from(ids);
};

const SearchAuto = ({ value, onSearch }) => {
  const history = useHistory();
  const { t } = useTranslation();

  const allOptions = useMemo(() => {
    const opts = [];
    CATEGORY_LIST.forEach((cat) => {
      const catLabel = t(cat.labelKey);
      opts.push({
        type: "category",
        category: cat.value,
        value: `cat:${cat.value}`,
        label: catLabel,
        searchLabel: catLabel,
      });
      const subs = subcategories[cat.value];
      if (subs) {
        subs.forEach((sub) => {
          const subLabel = t(sub.value);
          opts.push({
            type: "subcategory",
            category: cat.value,
            subcategory: sub.value,
            value: `sub:${cat.value}:${sub.value}`,
            label: subLabel,
            searchLabel: `${catLabel} › ${subLabel}`,
          });
        });
      }
    });
    return opts;
  }, [t]);

  const handleSelect = (val) => {
    if (!val) return;
    if (val.startsWith("cat:")) {
      const category = val.replace("cat:", "");
      history.push(`/advertisments/${category}`);
      if (onSearch) onSearch("");
    } else if (val.startsWith("sub:")) {
      const [, category, subcategory] = val.split(":");
      history.push(`/advertisments/${category}?subcategory=${subcategory}`);
      if (onSearch) onSearch("");
    }
  };

  const getFilteredOptions = () => {
    const input = (value || "").trim();
    if (!input || input.length < 2) return [];
    const byLabel = allOptions.filter((opt) =>
      matchesLabel(opt.searchLabel, input)
    );
    const keywordIds = getKeywordMatches(input);
    const byKeyword = allOptions.filter(
      (opt) =>
        (opt.type === "category" && keywordIds.includes(opt.category)) ||
        (opt.type === "subcategory" &&
          keywordIds.includes(opt.subcategory))
    );
    const matched = [...byLabel];
    byKeyword.forEach((opt) => {
      if (!matched.some((m) => m.value === opt.value)) matched.push(opt);
    });
    const categories = matched.filter((o) => o.type === "category");
    const subcats = matched.filter((o) => o.type === "subcategory");
    const ordered = [...categories, ...subcats];
    return ordered.slice(0, 12).map((opt) => ({
      value: opt.value,
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {opt.type === "category" ? (
            <FolderOutlined style={{ color: "#03989F" }} />
          ) : (
            <FolderOpenOutlined style={{ color: "#03989F", fontSize: 12 }} />
          )}
          <span>
            {opt.type === "subcategory" ? opt.searchLabel : opt.label}
          </span>
        </div>
      ),
    }));
  };

  return (
    <AutoComplete
      style={{ width: "100%", minHeight: "40px" }}
      value={value}
      options={getFilteredOptions()}
      placeholder={t("search")}
      notFoundContent={null}
      onSearch={onSearch}
      onChange={onSearch}
      onSelect={handleSelect}
      dropdownStyle={{ minWidth: 280 }}
      dropdownMatchSelectWidth={false}
    />
  );
};

export default SearchAuto;
