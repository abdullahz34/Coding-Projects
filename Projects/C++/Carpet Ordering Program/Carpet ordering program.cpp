#include<iostream>
#include<cstdlib>
#include<fstream>//used to perform read/write operation on txt file
using namespace std;
class Order //here is the class object for storing the order details
{
    private://these are the members
        int orderNO;
        string CarpetType;//carpet colour
        int quantity;
        int totalCost;
        int typeMoney; //Money on the basis of carpet
        void Calculation() //private function can only be call by class member functions and it is not directly accessible to user
        {
            if(CarpetType =="red"|| CarpetType=="Red"|| CarpetType=="RED")
                typeMoney=100;
            else if(CarpetType=="blue"|| CarpetType=="Blue"|| CarpetType=="BLUE")
                typeMoney=150;
            else
                typeMoney=200;
            totalCost=typeMoney*quantity;
            }
    public:
    //these are the member functions
        //Setters   (use of the setter functions is to save the pure values and to save member variables from user)
        void setMemberVariables(int order=0,string clr="",int quan=0,int cost=0){orderNO=order;CarpetType=clr;quantity=quan;totalCost=cost;}
        void setOrderNo(int order=0){orderNO=order;}
        void setColour(string clr=""){CarpetType=clr;}
        void setQuantity(int quan=0){quantity=quan;}
        void setTotalCost(int cost=0){totalCost=cost;}
    //getters (use to not access the member variables by name ,call them by getters member function)
        int getOrderNo(){return orderNO;}
        string getColour(){return CarpetType;}
        int getQuantity(){return quantity;}
        float getTotalCost(){return totalCost;}
    //Call the private function
        void Calculate(){Calculation();}
    //Operator Overload
        friend ostream& operator<< (ostream& out,const Order &right);
};
ostream& operator<< (ostream& cout,const Order & right)
{
    cout<<"***********************************\n";
    cout<<"Order No : "<<right.orderNO<<endl;
    cout<<"Carpet Colour : "<<right.CarpetType<<endl;
    cout<<"Carpet Quantity : "<<right.quantity<<" square metres "<<endl;
    cout<<"Total Cost :  "<<right.totalCost<<endl;
    cout<<"***********************************\n";
    return cout;
}

bool validateUserChoiceInput(string input)
{
    if(input.length()==1)//check if string length is greater than 1
        {
            int ascii=input[0];//get ascii of string index 0                    
            if(ascii>=48 && ascii <=57)//check if ascii is integer ascii
                {
                    if(ascii>=49 && ascii <=51)//check if it is between 1 and 3
                        return true;
                }
            else 
                return false;
        }
    else
        return false;
}
bool validateUserOrderNoAndQuantityInput(string input)
{    
    for (int i = 0; i < input.length(); i++)
        {            
            int ascii=input[i];//get ascii of string index i                    
            if (ascii<48 ||ascii>57)//check ascii is not integer
                {                                    
                    return false;   //return false in case if it is not integer
                }            
        }    
        return true;
}
//Display the Menu to the User
void mainMenu(string &choice)
{
    cout<<"\n\t***Magic Carpet Company***\n\n";
    cout<<"1.Order the Carpet\n";
    cout<<"2.View the Carpet Orders History \n";
    cout<<"3.Exit\n";    
    cout<<"-->Enter the Choice : ";
    cin>>choice;//Get the input from user
    while(!validateUserChoiceInput(choice))//Validate the Input
    {
        cout<<"Invalid Input\n";
        cout<<"-->Enter the Choice : ";
        cin>>choice;
    }
}
int main()
{
    string password;
    bool loop=true;    
    while(loop==true) {
        cout<<"-->Enter the password to Login : ";
        cin>>password;
        if(password=="admin123")//Validate the Password
        {                    
            bool emptyFile=false;//use to check whether the file is empty or not
            int counter=0;
            fstream my_file;//Create object for file operation
            my_file.open("ORDERS.txt");//open the File for existance purpose
            if (my_file) 
            {            
                //if file exist then it contain data or not                                            
                string line;
                while(getline(my_file,line))//read line by line from file
                {
                    counter++;  //increment in counter  
                }                    
                my_file.close();
                if(counter==0)
                {
                    // if file is empty
                    emptyFile=true;    
                }                
            }
            else
            {
                my_file.open("ORDERS.txt",ios::out);//open the File if not exist then create the file
                if (!my_file) 
                {
                cout << "File not Created";
                return 0;
                } 
                cout << "File Successfully Created";
                emptyFile=true;                                   
                my_file.close();
            }
            string choice;//temporary store the value for validation purpose
            bool flag=true;
            while(flag==true)
            {
                
                mainMenu(choice);                                                                                
                int integerConvert=choice[0]-48;//convert to integer value
    //            cout<<integerConvert<<endl;
                if(integerConvert==1)
                {
                    string temp;//temporary store the value for validation purpose
                    int orderNo,quantity;string carpetClr;
                    Order newOrder;
                    cout<<"Enter the OrderNo : ";
                    cin>>temp;
                    while(!validateUserOrderNoAndQuantityInput(temp))//Validate the orderNo
                    {
                        cout<<"Invalid Input\n";
                        cout<<"Enter the OrderNo : ";
                        cin>>temp;
                    }
                    orderNo=stoi(temp);                    
                    cout<<"Enter the Carpet Colour : ";
                    cin>>carpetClr;
                    while(carpetClr!="blue" && carpetClr!="Blue" &&carpetClr!="BLUE" &&
                          carpetClr!="red" &&carpetClr!="RED" &&carpetClr!="Red" &&
                          carpetClr!="Green" &&carpetClr!="green" &&carpetClr!="GREEN")//Validate the Colour Input
                    {
                        cout<<"Invalid Input (colours are (red,blue,green)\n";
                        cout<<"Enter the Carpet Colour : ";
                        cin>>carpetClr;
                    }
                    cout<<"Enter the quantity : ";
                    cin>>temp;
                    while(!validateUserOrderNoAndQuantityInput(temp))//Validate the orderNo
                    {
                        cout<<"Invalid Input\n";
                        cout<<"Enter the OrderNo : ";
                        cin>>temp;
                    }
                    quantity=stoi(temp);                    
                    newOrder.setOrderNo(orderNo);
                    newOrder.setColour(carpetClr);
                    newOrder.setQuantity(quantity);
                    newOrder.Calculate();
                    cout<<"\n\tOrder Details\n\n";                        
                    cout<<newOrder;  
                    int cost;
                    if(emptyFile!=true)               
                    {                                 
                        //if file have data
                        my_file.open("ORDERS.txt");
                        if (!my_file) {
                        cout << "No such file";
                        return 0;
                        }
                        int i=0;                        
                        Order *pastOrderData=new Order[counter];
                        //reading the file data
                        while (1) {                    
                            my_file >> orderNo;                            
                            my_file >> carpetClr;
                            my_file >> quantity;
                            my_file >> cost;
                            //storing the past orders
                            pastOrderData[i].setMemberVariables(orderNo,carpetClr,quantity,cost);
                            i++;
                            if(my_file.eof())                                            	
                            break;
                            }                             
                            my_file.close();
                            //writing data to file
                            my_file.open("ORDERS.txt");
                            if (!my_file) {
                            cout << "No such file";
                            return 0;
                            }                     
                            //Writing newly record       
                            my_file << newOrder.getOrderNo()<<" ";
                            my_file << newOrder.getColour()<<" ";
                            my_file << newOrder.getQuantity()<<" ";
                            my_file << newOrder.getTotalCost()<<" ";    
                            //Writing Previous record                            
                            for (int i = 0; i < counter; i++)
                            {
                                my_file<<endl<<pastOrderData[i].getOrderNo()<<" ";
                                my_file<<pastOrderData[i].getColour()<<" ";
                                my_file<<pastOrderData[i].getQuantity()<<" ";
                                my_file<<pastOrderData[i].getTotalCost();
                            }                                    
                            my_file.close();                              
                            
                    }  
                    else
                    {   
                        //if the file have no data                                                         
                        my_file.open("ORDERS.txt");
                        if (!my_file) 
                        {
                        cout << "No such file";
                        return 0;
                        }
                        //Write the newly Order                                                 
                        my_file << newOrder.getOrderNo()<<" ";
                        my_file << newOrder.getColour()<<" ";
                        my_file << newOrder.getQuantity()<<" ";
                        my_file << newOrder.getTotalCost();
                        my_file.close();
                        emptyFile=false;
                    } 
                    
                }
                else if(integerConvert==2)
                {       
                    counter=0;             
                    cout<<"\n\tOrders History\n";
                    if(emptyFile!=true)                    
                    {
                        int orderNo,quantity;string carpetClr;int cost;                        
                        my_file.open("ORDERS.txt");
                        if (!my_file) {
                        cout << "No such file have been found\n";
                        return 0;
                        }                                                
                        string line;
                        //Count the no of Orders in file
                        while(getline(my_file,line))
                        {
                            counter++;                                             
                        }                                       
                        my_file.close();
                        int i=0;
                        my_file.open("ORDERS.txt");
                        Order *pastOrderData=new Order[counter];
                        //reading the file data
                        while (1) {                    
                            my_file >> orderNo;                            
                            my_file >> carpetClr;
                            my_file >> quantity;
                            my_file >> cost;
                            pastOrderData[i].setMemberVariables(orderNo,carpetClr,quantity,cost);
                            i++;
                            if(my_file.eof())                                            	
                            break;
                            } 
                            //Print the Previous Data
                        for (i = 0; i < counter; i++)
                        {
                            cout<<pastOrderData[i]<<endl;
                        }
                            my_file.close();
                    }
                    else
                        cout<<"\n***No Previous orders***\n";
                }
                else//If user want to Exit
                    exit(1);
            }
        }
        else {
            //execute in case of Invalid Password
            cout<<"Incorrect Password\n";            
        }
    }
}