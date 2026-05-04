
CREATE TABLE dbo.clients ( 
    id int IDENTITY(1,1) NOT NULL, 
    name nvarchar(120) NOT NULL, 
    dni nvarchar(60) NOT NULL, 
    nationality nvarchar(80) NULL, 
    economicActivity nvarchar(160) NOT NULL, 
    sourceOfFunds nvarchar(160) NOT NULL, 
    estimatedMonthlyAmount decimal(18,2) NOT NULL, 
    useOfThirdParties bit DEFAULT 0 NOT NULL,
    CONSTRAINT PK_clients PRIMARY KEY (id), 
    CONSTRAINT UQ_clients_dni UNIQUE (dni)
);

CREATE TABLE dbo.risk_alerts ( 
    id int IDENTITY(1,1) NOT NULL, 
    clientId int NOT NULL, 
    [type] nvarchar(100) NOT NULL, 
    message nvarchar(255) NOT NULL, 
    isActive bit DEFAULT 1 NOT NULL, 
    createdAt datetime DEFAULT getdate() NOT NULL, 
    CONSTRAINT PK_risk_alerts PRIMARY KEY (id)
);

CREATE TABLE dbo.risks ( 
    id int IDENTITY(1,1) NOT NULL, 
    clientId int NOT NULL, 
    riskLevel nvarchar(50) NOT NULL, 
    evaluatedAt datetime DEFAULT getdate() NOT NULL, 
    CONSTRAINT PK_risks PRIMARY KEY (id)
);

CREATE TABLE dbo.[user] ( 
    id varchar(36) NOT NULL, 
    name varchar(255) NOT NULL, 
    email varchar(255) NOT NULL, 
    emailVerified smallint NOT NULL, 
    [image] varchar(MAX) NULL, 
    createdAt datetime2(3) DEFAULT getdate() NOT NULL, 
    updatedAt datetime2(3) DEFAULT getdate() NOT NULL, 
    [role] varchar(MAX) NULL, 
    banned smallint NULL, 
    banReason varchar(MAX) NULL, 
    banExpires datetime2(3) NULL, 
    CONSTRAINT PK__user__id PRIMARY KEY (id), 
    CONSTRAINT UQ__user__email UNIQUE (email)
);

CREATE TABLE dbo.verification ( 
    id varchar(36) NOT NULL, 
    identifier varchar(MAX) NOT NULL, 
    value varchar(MAX) NOT NULL, 
    expiresAt datetime2(3) NOT NULL, 
    createdAt datetime2(3) DEFAULT getdate() NOT NULL, 
    updatedAt datetime2(3) DEFAULT getdate() NOT NULL, 
    CONSTRAINT PK__verification__id PRIMARY KEY (id)
);

CREATE NONCLUSTERED INDEX verification_identifier_idx ON dbo.verification (identifier ASC);

CREATE TABLE dbo.account ( 
    id varchar(36) NOT NULL, 
    accountId varchar(MAX) NOT NULL, 
    providerId varchar(MAX) NOT NULL, 
    userId varchar(36) NOT NULL, 
    accessToken varchar(MAX) NULL, 
    refreshToken varchar(MAX) NULL, 
    idToken varchar(MAX) NULL, 
    accessTokenExpiresAt datetime2(3) NULL, 
    refreshTokenExpiresAt datetime2(3) NULL, 
    [scope] varchar(MAX) NULL, 
    password varchar(MAX) NULL, 
    createdAt datetime2(3) DEFAULT getdate() NOT NULL, 
    updatedAt datetime2(3) NOT NULL, 
    CONSTRAINT PK__account__id PRIMARY KEY (id), 
    CONSTRAINT FK__account__userId FOREIGN KEY (userId) REFERENCES dbo.[user](id) ON DELETE CASCADE
);

CREATE NONCLUSTERED INDEX account_userId_idx ON dbo.account (userId ASC);

CREATE TABLE dbo.[session] ( 
    id varchar(36) NOT NULL, 
    expiresAt datetime2(3) NOT NULL, 
    token varchar(255) NOT NULL, 
    createdAt datetime2(3) DEFAULT getdate() NOT NULL, 
    updatedAt datetime2(3) NOT NULL, 
    ipAddress varchar(MAX) NULL, 
    userAgent varchar(MAX) NULL, 
    userId varchar(36) NOT NULL, 
    impersonatedBy varchar(MAX) NULL, 
    CONSTRAINT PK__session__id PRIMARY KEY (id), 
    CONSTRAINT UQ__session__token UNIQUE (token), 
    CONSTRAINT FK__session__userId FOREIGN KEY (userId) REFERENCES dbo.[user](id) ON DELETE CASCADE
);

CREATE NONCLUSTERED INDEX session_userId_idx ON dbo.[session] (userId ASC);
