import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('cb8913fc-d28c-4444-8f2b-b867ae668169', '1Willy_Gleichner83@hotmail.com', 'Alex Jones', 'https://i.imgur.com/YfJQV5z.png?id=3', 'stu901vwx234', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('167747a1-3a0b-4861-b04f-86e2d9da6195', '17Itzel62@hotmail.com', 'Michael Johnson', 'https://i.imgur.com/YfJQV5z.png?id=19', 'yz567abc890', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('2201f3d0-edda-4f35-9de2-28f9d4a5fe51', '25Cornelius.Rau99@yahoo.com', 'Alex Jones', 'https://i.imgur.com/YfJQV5z.png?id=27', 'mno345pqr678', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('2e783130-445b-4f4c-add8-4c736cc9304c', '33Eddie.Brekke-Gibson23@hotmail.com', 'Alex Jones', 'https://i.imgur.com/YfJQV5z.png?id=35', 'abc123def456', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('9e7e8eeb-15a2-471f-ba5d-9dbb522478dd', '41Maci.Swaniawski53@gmail.com', 'Emily Brown', 'https://i.imgur.com/YfJQV5z.png?id=43', 'mno345pqr678', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('5ab09736-3f75-4fb5-b231-53c25e5e1a82', '49Cheyenne.Spinka-Goldner@yahoo.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=51', 'abc123def456', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('5b90987e-b6c3-467f-9836-8030f2a66691', '57Esther61@hotmail.com', 'Emily Brown', 'https://i.imgur.com/YfJQV5z.png?id=59', 'mno345pqr678', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('bd3fe14f-6a64-4775-adef-d4cd4c67474e', '65Delfina.Powlowski19@gmail.com', 'Emily Brown', 'https://i.imgur.com/YfJQV5z.png?id=67', 'stu901vwx234', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('631bb024-ad7a-441c-9aa8-d481bc9e7461', '73Horacio.Corkery62@yahoo.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=75', 'yz567abc890', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "Customer" ("id", "name", "email", "phone", "address", "userId") VALUES ('2265cc90-7ac0-4cd9-917b-41957b8ea362', 'Chris Brown', '82Aliza_Fritsch37@yahoo.com', '1123456789', '84 91 Christopher St, New York, NY 10014', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Customer" ("id", "name", "email", "phone", "address", "userId") VALUES ('af6a0aee-be61-459f-a652-9522fa8c325d', 'Michael Johnson', '87Vito1@gmail.com', '1212345678', '89 136 E 13th St, New York, NY 10003', '2e783130-445b-4f4c-add8-4c736cc9304c');
INSERT INTO "Customer" ("id", "name", "email", "phone", "address", "userId") VALUES ('762a2d45-60fc-48c6-a629-81700b45e9e1', 'Chris Brown', '92Eladio_Romaguera-Pfannerstill@yahoo.com', '1212345678', '94 91 Christopher St, New York, NY 10014', '2201f3d0-edda-4f35-9de2-28f9d4a5fe51');
INSERT INTO "Customer" ("id", "name", "email", "phone", "address", "userId") VALUES ('8bbdde4b-abfe-48f0-9424-53f7298b1103', 'Emily Davis', '97Raphael_Veum23@hotmail.com', '1212345678', '99 91 Christopher St, New York, NY 10014', '631bb024-ad7a-441c-9aa8-d481bc9e7461');
INSERT INTO "Customer" ("id", "name", "email", "phone", "address", "userId") VALUES ('f0ef2637-3615-46c7-9609-123c357126da', 'Michael Johnson', '102Dayne_Berge@yahoo.com', '1987654321', '104 42 E 20th St, New York, NY 10003', '5ab09736-3f75-4fb5-b231-53c25e5e1a82');
INSERT INTO "Customer" ("id", "name", "email", "phone", "address", "userId") VALUES ('a97b945c-af2b-4e1b-8c2a-8699c6d53f42', 'Chris Brown', '107Teresa.Towne32@gmail.com', '1098765432', '109 18 Spring St, New York, NY 10012', '167747a1-3a0b-4861-b04f-86e2d9da6195');
INSERT INTO "Customer" ("id", "name", "email", "phone", "address", "userId") VALUES ('296eedbc-a807-42a6-b2dc-446398eedfcb', 'John Doe', '112Deven.Kertzmann@hotmail.com', '1098765432', '114 330 W Broadway, New York, NY 10013', 'bd3fe14f-6a64-4775-adef-d4cd4c67474e');
INSERT INTO "Customer" ("id", "name", "email", "phone", "address", "userId") VALUES ('0b92b902-b44c-4429-8362-774b21052184', 'John Doe', '117Breanna_Gerhold69@hotmail.com', '1212345678', '119 42 E 20th St, New York, NY 10003', '167747a1-3a0b-4861-b04f-86e2d9da6195');
INSERT INTO "Customer" ("id", "name", "email", "phone", "address", "userId") VALUES ('963d30af-0984-41f9-ba1e-a52959bc6f1e', 'John Doe', '122Elias_Tillman@hotmail.com', '1212345678', '124 42 E 20th St, New York, NY 10003', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Customer" ("id", "name", "email", "phone", "address", "userId") VALUES ('f6244c1e-09e8-48b0-a2d4-dea13b728a21', 'Emily Davis', '127Floy.Abbott3@hotmail.com', '1098765432', '129 18 Spring St, New York, NY 10012', '167747a1-3a0b-4861-b04f-86e2d9da6195');

INSERT INTO "Product" ("id", "name", "description", "price") VALUES ('a09e696c-fe5b-4c2c-9f43-31dc8a4a713e', 'Sunset Blinds', 'Classic roller blinds that are easy to operate and maintain.', 904);
INSERT INTO "Product" ("id", "name", "description", "price") VALUES ('917a7164-18a4-49b4-b9a0-c3d5ea6e18da', 'Modern Shades', 'Classic roller blinds that are easy to operate and maintain.', 670);
INSERT INTO "Product" ("id", "name", "description", "price") VALUES ('c0e98528-e7ed-464a-843b-03f574d866dd', 'Modern Shades', 'Luxurious drapes with a silky finish perfect for living rooms.', 508);
INSERT INTO "Product" ("id", "name", "description", "price") VALUES ('4a7f5c76-c2f3-4336-b959-74166067ce6d', 'Modern Shades', 'Rich velvet curtains that add a touch of elegance to any room.', 386);
INSERT INTO "Product" ("id", "name", "description", "price") VALUES ('6db27676-5a9d-41fc-8da0-3ee97267391e', 'Modern Shades', 'Sleek and modern shades that provide privacy and style.', 653);
INSERT INTO "Product" ("id", "name", "description", "price") VALUES ('8255f82c-6f44-4c46-ba31-86082b4a532d', 'Sunset Blinds', 'Sleek and modern shades that provide privacy and style.', 127);
INSERT INTO "Product" ("id", "name", "description", "price") VALUES ('58fa1d64-9e57-4e05-88c9-6c4ac2a0daf0', 'Modern Shades', 'Classic roller blinds that are easy to operate and maintain.', 481);
INSERT INTO "Product" ("id", "name", "description", "price") VALUES ('97b17119-142f-4bbb-9417-f87c72ed638c', 'Velvet Curtains', 'Classic roller blinds that are easy to operate and maintain.', 354);
INSERT INTO "Product" ("id", "name", "description", "price") VALUES ('e091f10d-9e18-4563-9472-ea863cc562bf', 'Velvet Curtains', 'Rich velvet curtains that add a touch of elegance to any room.', 151);
INSERT INTO "Product" ("id", "name", "description", "price") VALUES ('12f05952-b073-4b5c-804e-d1428f820c16', 'Elegant Drapes', 'Luxurious drapes with a silky finish perfect for living rooms.', 36);

INSERT INTO "JobStatus" ("id", "name", "description") VALUES ('12efe125-c2a0-4bad-922e-8ad7d49a8e72', 'Completed', 'Job is currently being worked on.');
INSERT INTO "JobStatus" ("id", "name", "description") VALUES ('b28bb4e2-b186-40f6-a1f5-79fe3b371404', 'Cancelled', 'Job is awaiting assignment and resources.');
INSERT INTO "JobStatus" ("id", "name", "description") VALUES ('22b703e6-c725-40ae-8dcf-7603c70aa236', 'On Hold', 'Job is paused due to external factors.');
INSERT INTO "JobStatus" ("id", "name", "description") VALUES ('c07d7d54-ea60-4eb7-ba6e-6a6ff057c6af', 'In Progress', 'Job is paused due to external factors.');
INSERT INTO "JobStatus" ("id", "name", "description") VALUES ('332a3dcc-08b8-421b-9db8-25d22abe9404', 'Pending', 'Job is awaiting assignment and resources.');
INSERT INTO "JobStatus" ("id", "name", "description") VALUES ('afd81db8-9c03-45a4-9eb7-9c3fc6ebcd26', 'Pending', 'Job is currently being worked on.');
INSERT INTO "JobStatus" ("id", "name", "description") VALUES ('ae58f995-ffe7-4c89-b1c6-3fca0e149461', 'Completed', 'Job has been completed successfully.');
INSERT INTO "JobStatus" ("id", "name", "description") VALUES ('3ddfabba-815d-4a47-bb39-5e4ef20c4eee', 'On Hold', 'Job is currently being worked on.');
INSERT INTO "JobStatus" ("id", "name", "description") VALUES ('5b26978c-7409-4bec-9d6f-5a6d85da98dd', 'Pending', 'Job is currently being worked on.');
INSERT INTO "JobStatus" ("id", "name", "description") VALUES ('0b439153-34b1-4ad2-b7dd-dc2d18582cb3', 'On Hold', 'Job is paused due to external factors.');

INSERT INTO "Job" ("id", "customerId", "productId", "statusId") VALUES ('7dc6749c-3dfa-4930-9598-66aaf227721f', '0b92b902-b44c-4429-8362-774b21052184', '8255f82c-6f44-4c46-ba31-86082b4a532d', 'ae58f995-ffe7-4c89-b1c6-3fca0e149461');
INSERT INTO "Job" ("id", "customerId", "productId", "statusId") VALUES ('4ed5dcd8-b03f-4019-b357-42d8b8f85f54', 'a97b945c-af2b-4e1b-8c2a-8699c6d53f42', '6db27676-5a9d-41fc-8da0-3ee97267391e', '3ddfabba-815d-4a47-bb39-5e4ef20c4eee');
INSERT INTO "Job" ("id", "customerId", "productId", "statusId") VALUES ('dd142555-2de8-4985-b49e-3fe8267004b9', 'af6a0aee-be61-459f-a652-9522fa8c325d', '917a7164-18a4-49b4-b9a0-c3d5ea6e18da', '22b703e6-c725-40ae-8dcf-7603c70aa236');
INSERT INTO "Job" ("id", "customerId", "productId", "statusId") VALUES ('dbf25c27-54a8-4878-b851-02780fce3e52', '2265cc90-7ac0-4cd9-917b-41957b8ea362', '8255f82c-6f44-4c46-ba31-86082b4a532d', '12efe125-c2a0-4bad-922e-8ad7d49a8e72');
INSERT INTO "Job" ("id", "customerId", "productId", "statusId") VALUES ('1053ec28-d4fd-4065-a815-fbe5669315b3', '2265cc90-7ac0-4cd9-917b-41957b8ea362', '4a7f5c76-c2f3-4336-b959-74166067ce6d', 'afd81db8-9c03-45a4-9eb7-9c3fc6ebcd26');
INSERT INTO "Job" ("id", "customerId", "productId", "statusId") VALUES ('c9f81a8f-db66-40c6-bae6-9014166371b6', 'f0ef2637-3615-46c7-9609-123c357126da', '12f05952-b073-4b5c-804e-d1428f820c16', 'b28bb4e2-b186-40f6-a1f5-79fe3b371404');
INSERT INTO "Job" ("id", "customerId", "productId", "statusId") VALUES ('4aac16d1-8c24-4916-b8d8-8aff12faf6b1', '963d30af-0984-41f9-ba1e-a52959bc6f1e', '6db27676-5a9d-41fc-8da0-3ee97267391e', '22b703e6-c725-40ae-8dcf-7603c70aa236');
INSERT INTO "Job" ("id", "customerId", "productId", "statusId") VALUES ('51a847de-11ad-46ce-9f34-edae9c0812a0', '0b92b902-b44c-4429-8362-774b21052184', '12f05952-b073-4b5c-804e-d1428f820c16', 'b28bb4e2-b186-40f6-a1f5-79fe3b371404');
INSERT INTO "Job" ("id", "customerId", "productId", "statusId") VALUES ('bd8edc4d-ebd2-403c-9607-d9bf5ba7b0ae', 'f6244c1e-09e8-48b0-a2d4-dea13b728a21', '58fa1d64-9e57-4e05-88c9-6c4ac2a0daf0', '0b439153-34b1-4ad2-b7dd-dc2d18582cb3');
INSERT INTO "Job" ("id", "customerId", "productId", "statusId") VALUES ('d7e6d865-21cc-437f-b27d-d3dea90dee97', '296eedbc-a807-42a6-b2dc-446398eedfcb', '8255f82c-6f44-4c46-ba31-86082b4a532d', '3ddfabba-815d-4a47-bb39-5e4ef20c4eee');

INSERT INTO "CommunicationLog" ("id", "message", "jobId", "userId") VALUES ('06801c86-f445-4b6d-85b2-282c6673cbdd', 'Sent email with installation instructions.', '1053ec28-d4fd-4065-a815-fbe5669315b3', '2e783130-445b-4f4c-add8-4c736cc9304c');
INSERT INTO "CommunicationLog" ("id", "message", "jobId", "userId") VALUES ('63cbde90-d01c-4efd-808b-19f6849ba8e3', 'Updated customer on job progress.', 'dbf25c27-54a8-4878-b851-02780fce3e52', '5b90987e-b6c3-467f-9836-8030f2a66691');
INSERT INTO "CommunicationLog" ("id", "message", "jobId", "userId") VALUES ('e7ea8374-9750-47c3-ace8-40009da230ae', 'Updated customer on job progress.', 'd7e6d865-21cc-437f-b27d-d3dea90dee97', 'cb8913fc-d28c-4444-8f2b-b867ae668169');
INSERT INTO "CommunicationLog" ("id", "message", "jobId", "userId") VALUES ('5f961ba4-e069-4693-bee7-c3b3d93cf9d9', 'Customer called to confirm delivery date.', 'bd8edc4d-ebd2-403c-9607-d9bf5ba7b0ae', '2201f3d0-edda-4f35-9de2-28f9d4a5fe51');
INSERT INTO "CommunicationLog" ("id", "message", "jobId", "userId") VALUES ('1b515bf3-9889-4a0f-aaae-8111dbbccf3c', 'Sent email with installation instructions.', '4aac16d1-8c24-4916-b8d8-8aff12faf6b1', 'cb8913fc-d28c-4444-8f2b-b867ae668169');
INSERT INTO "CommunicationLog" ("id", "message", "jobId", "userId") VALUES ('646b7de6-69e0-4093-9fe1-0f3190a3b295', 'Updated customer on job progress.', '51a847de-11ad-46ce-9f34-edae9c0812a0', '9e7e8eeb-15a2-471f-ba5d-9dbb522478dd');
INSERT INTO "CommunicationLog" ("id", "message", "jobId", "userId") VALUES ('61f76976-2ed9-4ce2-89bd-a164e268f4dc', 'Followed up on payment status.', '1053ec28-d4fd-4065-a815-fbe5669315b3', '2201f3d0-edda-4f35-9de2-28f9d4a5fe51');
INSERT INTO "CommunicationLog" ("id", "message", "jobId", "userId") VALUES ('0b5f795a-d9e8-4e1a-8a7f-e9a509f601d0', 'Discussed fabric options for new order.', '1053ec28-d4fd-4065-a815-fbe5669315b3', '5ab09736-3f75-4fb5-b231-53c25e5e1a82');
INSERT INTO "CommunicationLog" ("id", "message", "jobId", "userId") VALUES ('db220d70-c339-4f8e-a30a-44eb1d107082', 'Discussed fabric options for new order.', '4ed5dcd8-b03f-4019-b357-42d8b8f85f54', '2201f3d0-edda-4f35-9de2-28f9d4a5fe51');
INSERT INTO "CommunicationLog" ("id", "message", "jobId", "userId") VALUES ('78a7e755-3860-4de7-94b4-cd84b7bc2df2', 'Updated customer on job progress.', 'dd142555-2de8-4985-b49e-3fe8267004b9', 'bd3fe14f-6a64-4775-adef-d4cd4c67474e');

INSERT INTO "Installation" ("id", "installationDate", "completed", "notes", "jobId") VALUES ('44d07679-1e63-4d28-aa40-cfb27f60da84', '2025-01-09T05:45:57.878Z', true, 'Installation completed successfully without any issues.', '4ed5dcd8-b03f-4019-b357-42d8b8f85f54');
INSERT INTO "Installation" ("id", "installationDate", "completed", "notes", "jobId") VALUES ('9fa7557f-9467-4057-b0ad-13b7ff3a1d2d', '2024-04-18T08:50:46.878Z', false, 'Installation delayed due to missing parts rescheduled for next week.', 'd7e6d865-21cc-437f-b27d-d3dea90dee97');
INSERT INTO "Installation" ("id", "installationDate", "completed", "notes", "jobId") VALUES ('b354038d-62e4-4e3d-bfbf-401463789447', '2024-03-12T10:31:36.523Z', true, 'Customer requested a change in the curtain fabric during installation.', '7dc6749c-3dfa-4930-9598-66aaf227721f');
INSERT INTO "Installation" ("id", "installationDate", "completed", "notes", "jobId") VALUES ('aed0c64e-af5b-4d0b-8504-21cdb11f1f86', '2024-04-23T23:18:49.955Z', true, 'Customer was satisfied with the installation process and outcome.', '4aac16d1-8c24-4916-b8d8-8aff12faf6b1');
INSERT INTO "Installation" ("id", "installationDate", "completed", "notes", "jobId") VALUES ('fd5d8cd6-4d44-46a4-9cfc-758088064e59', '2024-12-12T14:17:39.691Z', true, 'Installation completed successfully without any issues.', '1053ec28-d4fd-4065-a815-fbe5669315b3');
INSERT INTO "Installation" ("id", "installationDate", "completed", "notes", "jobId") VALUES ('fdc5872c-5587-4334-91e7-15fad50c909a', '2025-07-27T17:32:04.626Z', true, 'Customer requested a change in the curtain fabric during installation.', '1053ec28-d4fd-4065-a815-fbe5669315b3');
INSERT INTO "Installation" ("id", "installationDate", "completed", "notes", "jobId") VALUES ('28000a58-3510-4ac1-af82-c67fa687d8bf', '2024-02-29T08:07:33.216Z', false, 'Customer requested a change in the curtain fabric during installation.', '4aac16d1-8c24-4916-b8d8-8aff12faf6b1');
INSERT INTO "Installation" ("id", "installationDate", "completed", "notes", "jobId") VALUES ('09516f8a-d420-4b70-adfe-0336332a9eb8', '2025-05-30T18:25:00.115Z', false, 'Installer noted that the window measurements were slightly off.', 'dbf25c27-54a8-4878-b851-02780fce3e52');
INSERT INTO "Installation" ("id", "installationDate", "completed", "notes", "jobId") VALUES ('24d16221-459a-49d0-bdd1-e72048a303c3', '2023-11-26T12:49:19.360Z', false, 'Installation delayed due to missing parts rescheduled for next week.', '4aac16d1-8c24-4916-b8d8-8aff12faf6b1');
INSERT INTO "Installation" ("id", "installationDate", "completed", "notes", "jobId") VALUES ('704a72a0-3c0e-4505-ab44-8f7740c09a1b', '2024-05-04T00:46:15.671Z', false, 'Customer was satisfied with the installation process and outcome.', '51a847de-11ad-46ce-9f34-edae9c0812a0');

INSERT INTO "JobNote" ("id", "note", "jobId", "userId") VALUES ('ad3985b5-8194-4ba9-b698-1b26a8d6c3e2', 'Job completed and customer satisfied with the result.', 'bd8edc4d-ebd2-403c-9607-d9bf5ba7b0ae', '5b90987e-b6c3-467f-9836-8030f2a66691');
INSERT INTO "JobNote" ("id", "note", "jobId", "userId") VALUES ('ac4f8675-6449-4b2c-8cc1-86435a22bac9', 'Customer requested a change in fabric color.', 'd7e6d865-21cc-437f-b27d-d3dea90dee97', '5ab09736-3f75-4fb5-b231-53c25e5e1a82');
INSERT INTO "JobNote" ("id", "note", "jobId", "userId") VALUES ('0e94cf6e-446b-48dd-90ac-1d4fe6b4e0c1', 'Job completed and customer satisfied with the result.', 'dd142555-2de8-4985-b49e-3fe8267004b9', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "JobNote" ("id", "note", "jobId", "userId") VALUES ('e03d0984-7984-456b-a74f-7c0f477f217c', 'Awaiting materials delivery from supplier.', 'bd8edc4d-ebd2-403c-9607-d9bf5ba7b0ae', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "JobNote" ("id", "note", "jobId", "userId") VALUES ('8a70f23a-4086-4df5-b75b-be17c471f260', 'Confirmed measurements with the client.', 'bd8edc4d-ebd2-403c-9607-d9bf5ba7b0ae', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "JobNote" ("id", "note", "jobId", "userId") VALUES ('a8621f2c-c24c-4bfa-818e-5c3e0a0b9c23', 'Awaiting materials delivery from supplier.', 'bd8edc4d-ebd2-403c-9607-d9bf5ba7b0ae', '5b90987e-b6c3-467f-9836-8030f2a66691');
INSERT INTO "JobNote" ("id", "note", "jobId", "userId") VALUES ('bc4ade66-9595-409a-a9d0-e0a91613dbc6', 'Customer requested a change in fabric color.', '7dc6749c-3dfa-4930-9598-66aaf227721f', '5ab09736-3f75-4fb5-b231-53c25e5e1a82');
INSERT INTO "JobNote" ("id", "note", "jobId", "userId") VALUES ('b69fb338-a921-4d5d-8986-819a4aaac308', 'Job completed and customer satisfied with the result.', '51a847de-11ad-46ce-9f34-edae9c0812a0', '5b90987e-b6c3-467f-9836-8030f2a66691');
INSERT INTO "JobNote" ("id", "note", "jobId", "userId") VALUES ('a8b7b9cf-a012-4485-836a-821a4c83e5d7', 'Confirmed measurements with the client.', 'dbf25c27-54a8-4878-b851-02780fce3e52', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "JobNote" ("id", "note", "jobId", "userId") VALUES ('d40b5ec0-6422-4f63-8dac-af281380f9ca', 'Awaiting materials delivery from supplier.', 'dbf25c27-54a8-4878-b851-02780fce3e52', 'bd3fe14f-6a64-4775-adef-d4cd4c67474e');

INSERT INTO "JobSchedule" ("id", "scheduledDate", "scheduledTime", "jobId", "userId") VALUES ('ddac6d56-8294-484e-8c30-98dc5c2161d2', '2025-10-07T11:17:50.152Z', '20231101T090000Z', 'd7e6d865-21cc-437f-b27d-d3dea90dee97', '2201f3d0-edda-4f35-9de2-28f9d4a5fe51');
INSERT INTO "JobSchedule" ("id", "scheduledDate", "scheduledTime", "jobId", "userId") VALUES ('14c400bf-e88d-4c7c-b038-e56857f094e8', '2024-03-11T21:28:51.258Z', '20231101T090000Z', '4aac16d1-8c24-4916-b8d8-8aff12faf6b1', '5ab09736-3f75-4fb5-b231-53c25e5e1a82');
INSERT INTO "JobSchedule" ("id", "scheduledDate", "scheduledTime", "jobId", "userId") VALUES ('80715fb3-8c6b-4e45-8e4e-3bde7a3bcd68', '2024-09-06T14:05:20.985Z', '20231101T090000Z', 'bd8edc4d-ebd2-403c-9607-d9bf5ba7b0ae', '631bb024-ad7a-441c-9aa8-d481bc9e7461');
INSERT INTO "JobSchedule" ("id", "scheduledDate", "scheduledTime", "jobId", "userId") VALUES ('21876bf3-9327-43a9-8129-7aa794b61b22', '2024-05-28T06:44:31.254Z', '20231101T090000Z', '1053ec28-d4fd-4065-a815-fbe5669315b3', '5b90987e-b6c3-467f-9836-8030f2a66691');
INSERT INTO "JobSchedule" ("id", "scheduledDate", "scheduledTime", "jobId", "userId") VALUES ('9ef21edf-adf0-4fb9-8c00-aa29a45dd15a', '2025-05-30T05:28:11.932Z', '20231101T090000Z', 'dbf25c27-54a8-4878-b851-02780fce3e52', '5b90987e-b6c3-467f-9836-8030f2a66691');
INSERT INTO "JobSchedule" ("id", "scheduledDate", "scheduledTime", "jobId", "userId") VALUES ('9c20d3d7-73ac-4b09-931e-2db40dffa2ce', '2023-11-25T05:59:32.429Z', '20231105T080000Z', '1053ec28-d4fd-4065-a815-fbe5669315b3', '167747a1-3a0b-4861-b04f-86e2d9da6195');
INSERT INTO "JobSchedule" ("id", "scheduledDate", "scheduledTime", "jobId", "userId") VALUES ('648ebc9a-878a-41bf-a726-24a7aac23170', '2024-11-04T03:52:44.286Z', '20231101T090000Z', 'bd8edc4d-ebd2-403c-9607-d9bf5ba7b0ae', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "JobSchedule" ("id", "scheduledDate", "scheduledTime", "jobId", "userId") VALUES ('770919e4-1f79-458a-8f58-ab79881becc5', '2025-09-09T17:24:51.739Z', '20231103T111500Z', '4ed5dcd8-b03f-4019-b357-42d8b8f85f54', 'bd3fe14f-6a64-4775-adef-d4cd4c67474e');
INSERT INTO "JobSchedule" ("id", "scheduledDate", "scheduledTime", "jobId", "userId") VALUES ('cb94ed58-e809-4ba6-b9b8-aab02de2d4c6', '2025-07-17T08:16:01.392Z', '20231101T090000Z', 'dbf25c27-54a8-4878-b851-02780fce3e52', 'bd3fe14f-6a64-4775-adef-d4cd4c67474e');
INSERT INTO "JobSchedule" ("id", "scheduledDate", "scheduledTime", "jobId", "userId") VALUES ('8ebeaa10-a40b-4430-887b-fee93fc00f89', '2025-07-12T09:03:20.568Z', '20231103T111500Z', 'dd142555-2de8-4985-b49e-3fe8267004b9', '631bb024-ad7a-441c-9aa8-d481bc9e7461');

INSERT INTO "JobSheet" ("id", "sheetUrl", "jobId") VALUES ('a29b534e-51a4-4848-a25e-b2eef6f0da98', 'https://i.imgur.com/YfJQV5z.png?id=321', '1053ec28-d4fd-4065-a815-fbe5669315b3');
INSERT INTO "JobSheet" ("id", "sheetUrl", "jobId") VALUES ('b5ac84f6-fa4d-4feb-a580-41c5172e59fe', 'https://i.imgur.com/YfJQV5z.png?id=323', 'dd142555-2de8-4985-b49e-3fe8267004b9');
INSERT INTO "JobSheet" ("id", "sheetUrl", "jobId") VALUES ('de279b47-1ae0-43d3-aaf8-3707b0dc1e60', 'https://i.imgur.com/YfJQV5z.png?id=325', 'dd142555-2de8-4985-b49e-3fe8267004b9');
INSERT INTO "JobSheet" ("id", "sheetUrl", "jobId") VALUES ('7cd11b09-c824-4eef-98bd-bff72f160b21', 'https://i.imgur.com/YfJQV5z.png?id=327', '7dc6749c-3dfa-4930-9598-66aaf227721f');
INSERT INTO "JobSheet" ("id", "sheetUrl", "jobId") VALUES ('90fd9682-8c86-42be-a6fe-ae459373a4c5', 'https://i.imgur.com/YfJQV5z.png?id=329', 'c9f81a8f-db66-40c6-bae6-9014166371b6');
INSERT INTO "JobSheet" ("id", "sheetUrl", "jobId") VALUES ('388a778f-0070-4840-85e7-24cedc339e60', 'https://i.imgur.com/YfJQV5z.png?id=331', 'bd8edc4d-ebd2-403c-9607-d9bf5ba7b0ae');
INSERT INTO "JobSheet" ("id", "sheetUrl", "jobId") VALUES ('c674e29b-8258-4cda-908f-cb75cb346c6a', 'https://i.imgur.com/YfJQV5z.png?id=333', 'dbf25c27-54a8-4878-b851-02780fce3e52');
INSERT INTO "JobSheet" ("id", "sheetUrl", "jobId") VALUES ('28819bc4-b473-43d7-829e-14c0487b543b', 'https://i.imgur.com/YfJQV5z.png?id=335', '7dc6749c-3dfa-4930-9598-66aaf227721f');
INSERT INTO "JobSheet" ("id", "sheetUrl", "jobId") VALUES ('f38b6939-eb5b-4d19-8436-f7e07925ff5e', 'https://i.imgur.com/YfJQV5z.png?id=337', 'bd8edc4d-ebd2-403c-9607-d9bf5ba7b0ae');
INSERT INTO "JobSheet" ("id", "sheetUrl", "jobId") VALUES ('2bf2f14e-e9b3-47af-8bfe-e70121b7f9ff', 'https://i.imgur.com/YfJQV5z.png?id=339', 'd7e6d865-21cc-437f-b27d-d3dea90dee97');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
