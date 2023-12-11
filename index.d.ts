declare module 'the-noun-project-v2' {
    export default class NounProject {
        constructor(config: { key: string, secret: string });
        getIconsByTerm(term: string, options: { [key: string]: any }, callback: (error: any, data: Icon) => void): void;
        getIconById(id: string, options: { [key: string]: any }, callback: (error: any, callback: (error: any, data: Icon) => void) => void): void;
        downloadIconById(id: string, options: { [key: string]: any }, callback: (error: any, callback: (error: any, data: Icon) => void) => void): void;
        getUsage(callback: (error: any) => void): void;
    }

    // Define the Icon type
    export type Icon = {
        attribution: string;
        collections: Collection[];
        creator: Creator;
        id: string;
        license_description: string;
        permalink: string;
        tags: string[];
        term: string;
        thumbnail_url: string;
        updated_at: string;
    };

    // Define supporting types Collection and Creator
    type Collection = {
        creator: {
            name: string;
            permalink: string;
            username: string;
        };
        id: string;
        name: string;
        permalink: string;
    };

    type Creator = {
        name: string;
        permalink: string;
        username: string;
    };

    export type DownloadedIcon = {
        base64_encoded_file: string;
    }
}
