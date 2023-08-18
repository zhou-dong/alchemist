CREATE TABLE `targeting_properties` (
    `targeting_property_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `parent_targeting_property_id` int(11) unsigned DEFAULT NULL,
    `partner_id` int(11) DEFAULT NULL,
    `targeting_property_name` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL,
    `expandable` int(1) unsigned NOT NULL DEFAULT '0',
    `type` enum (
        'audience',
        'geo',
        'datetime',
        'os',
        'group',
        'viewability'
    ) NOT NULL DEFAULT 'audience',
    `source` enum ('cookie', 'url') DEFAULT NULL,
    `key` varchar(255) DEFAULT NULL,
    `value` varchar(255) DEFAULT NULL,
    `related_object_type` varchar(30) NOT NULL,
    `related_object_id` int(11) NOT NULL,
    `subject` enum ('inventory', 'visitor') DEFAULT NULL,
    `operator` enum ('=', '>=', 'between') NOT NULL DEFAULT '=',
    `status` enum ('active', 'deleted', 'archived') NOT NULL DEFAULT 'active',
    `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `updated_by` int(11) DEFAULT NULL,
    `created` datetime DEFAULT NULL,
    `created_by` int(11) DEFAULT NULL,
    PRIMARY KEY (`targeting_property_id`)
);

CREATE TABLE `targeting_taxonomy_items` (
    `targeting_taxonomy_item_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `targeting_property_id` int(11) unsigned DEFAULT NULL,
    `targeting_taxonomy_item_name` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL,
    `parent_targeting_taxonomy_item_id` int(11) unsigned DEFAULT NULL,
    `partner_id` int(11) DEFAULT NULL,
    `sort_order` smallint(6) NOT NULL DEFAULT '0',
    `status` enum ('active', 'deleted', 'archived') NOT NULL DEFAULT 'active',
    `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `updated_by` int(11) DEFAULT NULL,
    `created` datetime DEFAULT NULL,
    `created_by` int(11) DEFAULT NULL,
    PRIMARY KEY (`targeting_taxonomy_item_id`)
);

INSERT INTO
    targeting_taxonomy_items(
        targeting_taxonomy_item_id,
        targeting_property_id,
        targeting_taxonomy_item_name,
        parent_targeting_taxonomy_item_id,
        partner_id,
        sort_order,
        status,
        updated,
        updated_by,
        created,
        created_by
    )
VALUES
    (
        '1462',
        '1370',
        'United States',
        '12',
        NULL,
        '0',
        'active',
        '2013-09-11 12:04:06',
        '8',
        '2013-09-11 12:03:49',
        '8'
    );

INSERT INTO
    targeting_taxonomy_items(
        targeting_taxonomy_item_id,
        targeting_property_id,
        targeting_taxonomy_item_name,
        parent_targeting_taxonomy_item_id,
        partner_id,
        sort_order,
        status,
        updated,
        updated_by,
        created,
        created_by
    )
VALUES
    (
        '1464',
        '1372',
        'Canada',
        '12',
        NULL,
        '0',
        'active',
        '2013-09-11 12:04:06',
        '8',
        '2013-09-11 12:03:49',
        '8'
    );

INSERT INTO
    targeting_taxonomy_items(
        targeting_taxonomy_item_id,
        targeting_property_id,
        targeting_taxonomy_item_name,
        parent_targeting_taxonomy_item_id,
        partner_id,
        sort_order,
        status,
        updated,
        updated_by,
        created,
        created_by
    )
VALUES
    (
        '1466',
        '1374',
        'Latin America',
        '12',
        NULL,
        '0',
        'active',
        '2013-09-11 12:04:06',
        '8',
        '2013-09-11 12:03:49',
        '8'
    );