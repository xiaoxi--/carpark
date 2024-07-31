import type { Sequelize, Model } from "sequelize";
import { n_target_org } from "./n_target_org";
import type { n_target_orgAttributes, n_target_orgCreationAttributes } from "./n_target_org";
import { n_target_org_group } from "./n_target_org_group";
import type { n_target_org_groupAttributes, n_target_org_groupCreationAttributes } from "./n_target_org_group";
import { n_target_person } from "./n_target_person";
import type { n_target_personAttributes, n_target_personCreationAttributes } from "./n_target_person";
import { news } from "./news";
import type { newsAttributes, newsCreationAttributes } from "./news";
import { news_tag_relationship } from "./news_tag_relationship";
import type { news_tag_relationshipAttributes, news_tag_relationshipCreationAttributes } from "./news_tag_relationship";
import { tag } from "./tag";
import type { tagAttributes, tagCreationAttributes } from "./tag";
import { vw_n_target_index } from "./vw_n_target_index";
import type { vw_n_target_indexAttributes, vw_n_target_indexCreationAttributes } from "./vw_n_target_index";
import { vw_news } from "./vw_news";
import type { vw_newsAttributes, vw_newsCreationAttributes } from "./vw_news";

export {
  n_target_org,
  n_target_org_group,
  n_target_person,
  news,
  news_tag_relationship,
  tag,
  vw_n_target_index,
  vw_news,
};

export type {
  n_target_orgAttributes,
  n_target_orgCreationAttributes,
  n_target_org_groupAttributes,
  n_target_org_groupCreationAttributes,
  n_target_personAttributes,
  n_target_personCreationAttributes,
  newsAttributes,
  newsCreationAttributes,
  news_tag_relationshipAttributes,
  news_tag_relationshipCreationAttributes,
  tagAttributes,
  tagCreationAttributes,
  vw_n_target_indexAttributes,
  vw_n_target_indexCreationAttributes,
  vw_newsAttributes,
  vw_newsCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  n_target_org.initModel(sequelize);
  n_target_org_group.initModel(sequelize);
  n_target_person.initModel(sequelize);
  news.initModel(sequelize);
  news_tag_relationship.initModel(sequelize);
  tag.initModel(sequelize);
  vw_n_target_index.initModel(sequelize);
  vw_news.initModel(sequelize);

  n_target_org.belongsTo(news, { as: "news", foreignKey: "news_id"});
  news.hasMany(n_target_org, { as: "n_target_orgs", foreignKey: "news_id"});
  n_target_org_group.belongsTo(news, { as: "news", foreignKey: "news_id"});
  news.hasMany(n_target_org_group, { as: "n_target_org_groups", foreignKey: "news_id"});
  n_target_person.belongsTo(news, { as: "news", foreignKey: "news_id"});
  news.hasMany(n_target_person, { as: "n_target_people", foreignKey: "news_id"});
  news_tag_relationship.belongsTo(news, { as: "news", foreignKey: "news_id"});
  news.hasMany(news_tag_relationship, { as: "news_tag_relationships", foreignKey: "news_id"});
  news_tag_relationship.belongsTo(tag, { as: "tag", foreignKey: "tag_id"});
  tag.hasMany(news_tag_relationship, { as: "news_tag_relationships", foreignKey: "tag_id"});

  return {
    n_target_org: n_target_org,
    n_target_org_group: n_target_org_group,
    n_target_person: n_target_person,
    news: news,
    news_tag_relationship: news_tag_relationship,
    tag: tag,
    vw_n_target_index: vw_n_target_index,
    vw_news: vw_news,
  };
}
