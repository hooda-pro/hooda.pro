// =============================================
// ملف البيانات (data.js)
// =============================================

// بيانات الطلاب المحلية
const students = {
    '2023001': { password: 'pass123', name: 'محمود أحمد', grade: 'العاشر' },
    '2023002': { password: 'pass456', name: 'سلمي سيد', grade: 'العاشر' },
    'test': { password: '123', name: 'طالب تجريبي', grade: 'العاشر' },
    'student1': { password: '12345', name: 'أحمد محمد', grade: 'الحادي عشر' },
    'student2': { password: '54321', name: 'ليلى علي', grade: 'الحادي عشر' },
    '470605567': { password: 'p9_tpqNY', name: 'محمود احمد سعيد', grade: 'اولي ثانوي' }
};

// أسئلة JavaScript أساسيات
const javascriptBasicQuestions = [
    {
        id: 1,
        question: "ما هي نتيجة تنفيذ الكود التالي: console.log(typeof 42);",
        options: ["'number'", "'string'", "'object'", "'undefined'"],
        correct: 0,
        points: 5
    },
    {
        id: 2,
        question: "ما هي الدالة المستخدمة لتحويل نص إلى عدد في JavaScript؟",
        options: ["parseInt()", "toString()", "Number()", "كل ما سبق"],
        correct: 3,
        points: 5
    },
    {
        id: 3,
        question: "كيف تعرف متغيراً لا يمكن تغيير قيمته؟",
        options: ["var", "let", "const", "static"],
        correct: 2,
        points: 5
    },
    {
        id: 4,
        question: "ما هي نتيجة: 3 == '3' في JavaScript؟",
        options: ["true", "false", "undefined", "خطأ"],
        correct: 0,
        points: 5
    },
    {
        id: 5,
        question: "كيف تضيف عنصراً إلى نهاية مصفوفة؟",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correct: 0,
        points: 5
    },
    {
        id: 6,
        question: "ما هو الفرق بين == و === في JavaScript؟",
        options: [
            "لا فرق",
            "== تقارن القيم فقط، === تقارن القيم والنوع",
            "=== تقارن القيم فقط، == تقارن القيم والنوع",
            "== تستخدم للأرقام فقط"
        ],
        correct: 1,
        points: 5
    },
    {
        id: 7,
        question: "كيف تكتب دالة سهم (Arrow Function)؟",
        options: [
            "function() {}",
            "() => {}",
            "arrow function() {}",
            "def function() {}"
        ],
        correct: 1,
        points: 5
    },
    {
        id: 8,
        question: "ما هي نتيجة: console.log(1 + '1')؟",
        options: ["2", "11", "undefined", "خطأ"],
        correct: 1,
        points: 5
    },
    {
        id: 9,
        question: "كيف تتحقق مما إذا كان المتغير غير معرف؟",
        options: [
            "typeof x === 'undefined'",
            "x === undefined",
            "x === null",
            "الخياران الأول والثاني"
        ],
        correct: 3,
        points: 5
    },
    {
        id: 10,
        question: "ما هي الدالة المستخدمة لتنفيذ كود بعد فترة زمنية؟",
        options: ["setInterval()", "setTimeout()", "wait()", "delay()"],
        correct: 1,
        points: 5
    },
    {
        id: 11,
        question: "كيف تحول نص إلى أحرف كبيرة؟",
        options: ["toUpperCase()", "toLowercase()", "capitalize()", "upper()"],
        correct: 0,
        points: 5
    },
    {
        id: 12,
        question: "ما هي قيمة: Boolean('')؟",
        options: ["true", "false", "undefined", "null"],
        correct: 1,
        points: 5
    },
    {
        id: 13,
        question: "كيف تحصل على طول مصفوفة؟",
        options: ["array.size", "array.length", "array.count", "array.items"],
        correct: 1,
        points: 5
    },
    {
        id: 14,
        question: "ما هي نتيجة: console.log([] == [])؟",
        options: ["true", "false", "undefined", "خطأ"],
        correct: 1,
        points: 5
    },
    {
        id: 15,
        question: "كيف تكتب تعليق في JavaScript؟",
        options: [
            "// تعليق",
            "/* تعليق */",
            "# تعليق",
            "الخياران الأول والثاني"
        ],
        correct: 3,
        points: 5
    },
    {
        id: 16,
        question: "ما هو نوع البيانات الذي يعيده typeof null؟",
        options: ["'null'", "'object'", "'undefined'", "'number'"],
        correct: 1,
        points: 5
    },
    {
        id: 17,
        question: "كيف تنشئ كائن في JavaScript؟",
        options: [
            "let obj = {}",
            "let obj = new Object()",
            "let obj = Object.create()",
            "كل ما سبق"
        ],
        correct: 3,
        points: 5
    },
    {
        id: 18,
        question: "ما هي نتيجة: console.log(0.1 + 0.2 === 0.3)؟",
        options: ["true", "false", "undefined", "خطأ"],
        correct: 1,
        points: 5
    },
    {
        id: 19,
        question: "كيف تحذف عنصراً من مصفوفة باستخدام index؟",
        options: ["delete", "splice()", "remove()", "pop()"],
        correct: 1,
        points: 5
    },
    {
        id: 20,
        question: "ما هي الدالة المستخدمة لتحويل كائن إلى JSON؟",
        options: ["JSON.parse()", "JSON.stringify()", "toJSON()", "parseJSON()"],
        correct: 1,
        points: 5
    }
];

// مكتبة الأمثلة الكاملة (15 مثال)
const examplesLibrary = [
    {
        id: 1,
        title: "أساسيات الجمع والطرح",
        description: "عمليات حسابية بسيطة للمبتدئين",
        category: "مبتدئ",
        tags: ["حساب", "مبتدئ"],
        level: "beginner",
        code: `// العمليات الحسابية الأساسية
console.log("الجمع: 10 + 5 =", 10 + 5);
console.log("الطرح: 10 - 5 =", 10 - 5);
console.log("الضرب: 10 * 5 =", 10 * 5);
console.log("القسمة: 10 / 5 =", 10 / 5);
console.log("الباقي: 10 % 3 =", 10 % 3);`
    },
    {
        id: 2,
        title: "المتغيرات وأنواع البيانات",
        description: "تعريف واستخدام المتغيرات",
        category: "مبتدئ",
        tags: ["متغيرات", "أنواع"],
        level: "beginner",
        code: `// تعريف المتغيرات
let name = "أحمد";
const age = 25;
var city = "القاهرة";

console.log("الاسم:", name);
console.log("العمر:", age);
console.log("المدينة:", city);

// أنواع البيانات
let number = 100;
let text = "مرحباً";
let isStudent = true;
let fruits = ["تفاح", "موز", "برتقال"];
let person = { name: "سارة", age: 30 };

console.log("نوع الرقم:", typeof number);
console.log("نوع النص:", typeof text);
console.log("نوع المصفوفة:", typeof fruits);`
    },
    {
        id: 3,
        title: "الدوال البسيطة",
        description: "إنشاء واستدعاء الدوال",
        category: "مبتدئ",
        tags: ["دوال", "برمجة"],
        level: "beginner",
        code: `// دالة بسيطة
function greet(name) {
    return "مرحباً " + name + "!";
}

console.log(greet("محمد"));
console.log(greet("سارة"));

// دالة حسابية
function square(x) {
    return x * x;
}

console.log("مربع 8 هو:", square(8));
console.log("مربع 12 هو:", square(12));`
    },
    {
        id: 4,
        title: "المصفوفات الأساسية",
        description: "التعامل مع المصفوفات",
        category: "مبتدئ",
        tags: ["مصفوفات", "بيانات"],
        level: "beginner",
        code: `// إنشاء مصفوفة
let fruits = ["تفاح", "موز", "برتقال", "فراولة"];

console.log("المصفوفة:", fruits);
console.log("الطول:", fruits.length);
console.log("العنصر الأول:", fruits[0]);

// إضافة وإزالة
fruits.push("مانجو");
console.log("بعد إضافة مانجو:", fruits);

fruits.pop();
console.log("بعد إزالة آخر عنصر:", fruits);

// التكرار
console.log("عرض جميع الفواكه:");
for(let i = 0; i < fruits.length; i++) {
    console.log(i + 1 + ". " + fruits[i]);
}`
    },
    {
        id: 5,
        title: "الشروط الأساسية",
        description: "استخدام if و else",
        category: "مبتدئ",
        tags: ["شروط", "منطق"],
        level: "beginner",
        code: `// if بسيط
let age = 20;

if (age >= 18) {
    console.log("يمكنك التصويت");
} else {
    console.log("لا يمكنك التصويت");
}

// else if
let score = 85;

if (score >= 90) {
    console.log("ممتاز - A");
} else if (score >= 80) {
    console.log("جيد جداً - B");
} else if (score >= 70) {
    console.log("جيد - C");
} else {
    console.log("يحتاج تحسين");
}

// Ternary Operator
let temperature = 25;
let weather = temperature > 30 ? "حار" : "معتدل";
console.log("الجو:", weather);`
    },
    {
        id: 6,
        title: "الحلقات Loops",
        description: "استخدام for و while",
        category: "مبتدئ",
        tags: ["حلقات", "تكرار"],
        level: "beginner",
        code: `// for loop
console.log("الأرقام من 1 إلى 5:");
for(let i = 1; i <= 5; i++) {
    console.log("رقم:", i);
}

// while loop
console.log("العد التنازلي:");
let count = 5;
while(count > 0) {
    console.log(count);
    count--;
}

// for...of مع المصفوفات
let fruits = ["تفاح", "موز", "برتقال"];
console.log("عرض الفواكه:");
for(let fruit of fruits) {
    console.log("فاكهة:", fruit);
}

// break و continue
console.log("الأرقام من 1 إلى 10 (تخطي 5):");
for(let i = 1; i <= 10; i++) {
    if(i === 5) continue;
    console.log(i);
}`
    },
    {
        id: 7,
        title: "الكائنات Objects",
        description: "إنشاء واستخدام الكائنات",
        category: "متوسط",
        tags: ["كائنات", "بيانات"],
        level: "intermediate",
        code: `// إنشاء كائن
let person = {
    name: "أحمد",
    age: 30,
    city: "الإسكندرية",
    isStudent: false,
    
    // دالة داخل الكائن
    greet: function() {
        return "مرحباً، أنا " + this.name;
    }
};

console.log("الكائن:", person);
console.log("الاسم:", person.name);
console.log("العمر:", person['age']);
console.log(person.greet());

// إضافة خصائص جديدة
person.email = "ahmed@example.com";
console.log("بعد إضافة الإيميل:", person);

// التكرار على الخصائص
console.log("خصائص الكائن:");
for(let key in person) {
    if(typeof person[key] !== 'function') {
        console.log(key + ": " + person[key]);
    }
}`
    },
    {
        id: 8,
        title: "الدوال المتقدمة",
        description: "الدوال مع معاملات ودوال السهم",
        category: "متوسط",
        tags: ["دوال", "متقدم"],
        level: "intermediate",
        code: `// دالة مع معاملات متعددة
function calculate(num1, num2, operation) {
    switch(operation) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if(num2 === 0) return "لا يمكن القسمة على صفر";
            return num1 / num2;
        default:
            return "عملية غير صحيحة";
    }
}

console.log("10 + 5 =", calculate(10, 5, '+'));
console.log("10 * 5 =", calculate(10, 5, '*'));

// دالة السهم (Arrow Function)
const square = (x) => x * x;
console.log("مربع 9 هو:", square(9));

const sumArray = (arr) => {
    let total = 0;
    for(let num of arr) {
        total += num;
    }
    return total;
};

console.log("مجموع [1,2,3,4,5] هو:", sumArray([1,2,3,4,5]));

// دالة مع قيمة افتراضية
function greet(name = "زائر") {
    return "أهلاً وسهلاً " + name;
}

console.log(greet("محمود"));
console.log(greet());`
    },
    {
        id: 9,
        title: "المصفوفات المتقدمة",
        description: "الدوال المدمجة في المصفوفات",
        category: "متوسط",
        tags: ["مصفوفات", "متقدم"],
        level: "intermediate",
        code: `let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// map - تحويل المصفوفة
let squares = numbers.map(num => num * num);
console.log("مربعات الأرقام:", squares);

// filter - تصفية المصفوفة
let evenNumbers = numbers.filter(num => num % 2 === 0);
console.log("الأرقام الزوجية:", evenNumbers);

// reduce - جمع المصفوفة
let sum = numbers.reduce((total, num) => total + num, 0);
console.log("مجموع الأرقام:", sum);

// find - البحث في المصفوفة
let found = numbers.find(num => num > 5);
console.log("أول رقم أكبر من 5:", found);

// sort - ترتيب المصفوفة
let randomNumbers = [3, 1, 4, 1, 5, 9, 2, 6];
let sorted = randomNumbers.sort((a, b) => a - b);
console.log("الأرقام المرتبة:", sorted);`
    },
    {
        id: 10,
        title: "التعامل مع النصوص",
        description: "الدوال المدمجة في النصوص",
        category: "متوسط",
        tags: ["نصوص", "معالجة"],
        level: "intermediate",
        code: `let text = "مرحباً بك في عالم JavaScript";

console.log("طول النص:", text.length);
console.log("أحرف كبيرة:", text.toUpperCase());
console.log("أحرف صغيرة:", text.toLowerCase());
console.log("هل يحتوي على 'JavaScript'؟", text.includes("JavaScript"));
console.log("موقع كلمة 'عالم':", text.indexOf("عالم"));

// تقسيم النص
let words = text.split(" ");
console.log("الكلمات:", words);
console.log("عدد الكلمات:", words.length);

// استبدال النص
let newText = text.replace("JavaScript", "البرمجة");
console.log("النص الجديد:", newText);

// أخذ جزء من النص
console.log("الأول 7 أحرف:", text.substring(0, 7));`
    },
    {
        id: 11,
        title: "التاريخ والوقت",
        description: "التعامل مع Date object",
        category: "متوسط",
        tags: ["تاريخ", "وقت"],
        level: "intermediate",
        code: `// التاريخ الحالي
let now = new Date();
console.log("التاريخ الكامل:", now);
console.log("السنة:", now.getFullYear());
console.log("الشهر:", now.getMonth() + 1);
console.log("اليوم:", now.getDate());
console.log("الساعة:", now.getHours());
console.log("الدقائق:", now.getMinutes());
console.log("الثواني:", now.getSeconds());

// تنسيق التاريخ
let options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};
console.log("التاريخ المنسق:", now.toLocaleDateString('ar-SA', options));

// حساب الفرق بين تاريخين
let date1 = new Date(2024, 0, 1);
let date2 = new Date(2024, 11, 31);
let difference = date2 - date1;
let days = Math.floor(difference / (1000 * 60 * 60 * 24));
console.log("عدد الأيام بين 1 يناير و31 ديسمبر 2024:", days);`
    },
    {
        id: 12,
        title: "معالجة الأخطاء",
        description: "try...catch و throw",
        category: "متقدم",
        tags: ["أخطاء", "معالجة"],
        level: "advanced",
        code: `// try...catch الأساسي
try {
    console.log("بداية البرنامج");
    let result = 10 / 2;
    console.log("نتيجة القسمة:", result);
    
    // خطأ متعمد
    let x = y + 5;
    
} catch(error) {
    console.log("حدث خطأ!");
    console.log("الرسالة:", error.message);
}

console.log("البرنامج مستمر...");

// throw - خطأ مخصص
function divide(a, b) {
    if(b === 0) {
        throw new Error("لا يمكن القسمة على صفر");
    }
    return a / b;
}

try {
    console.log("10 / 2 =", divide(10, 2));
    console.log("10 / 0 =", divide(10, 0));
} catch(error) {
    console.log("خطأ في القسمة:", error.message);
}`
    },
    {
        id: 13,
        title: "الوعود Promises",
        description: "التعامل مع العمليات غير المتزامنة",
        category: "متقدم",
        tags: ["Promises", "غير متزامن"],
        level: "advanced",
        code: `// إنشاء Promise
let promise = new Promise((resolve, reject) => {
    console.log("جاري تنفيذ العملية...");
    
    setTimeout(() => {
        let success = Math.random() > 0.5;
        
        if(success) {
            resolve("تمت العملية بنجاح!");
        } else {
            reject("فشلت العملية");
        }
    }, 2000);
});

// استخدام Promise
promise
    .then(result => {
        console.log("النتيجة:", result);
    })
    .catch(error => {
        console.log("خطأ:", error);
    })
    .finally(() => {
        console.log("انتهت العملية");
    });`
    },
    {
        id: 14,
        title: "الفئات Classes",
        description: "البرمجة الكائنية في JavaScript",
        category: "متوسط",
        tags: ["Classes", "OOP"],
        level: "intermediate",
        code: `// تعريف class
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return "مرحباً، أنا " + this.name + " وعمري " + this.age;
    }
}

// إنشاء كائن
let person1 = new Person("أحمد", 25);
console.log("الكائن:", person1);
console.log(person1.greet());

// الوراثة
class Student extends Person {
    constructor(name, age, major) {
        super(name, age);
        this.major = major;
    }
    
    study() {
        return "أدرس " + this.major;
    }
}

// إنشاء طالب
let student = new Student("سارة", 20, "علوم حاسب");
console.log("\\nالطالب:", student);
console.log(student.greet());
console.log(student.study());`
    },
    {
        id: 15,
        title: "حاسبة متكاملة",
        description: "مشروع كامل مع واجهة برمجة",
        category: "مشروع",
        tags: ["مشروع", "حاسبة", "كامل"],
        level: "advanced",
        code: `// حاسبة متكاملة
class Calculator {
    constructor() {
        this.history = [];
    }
    
    add(a, b) {
        const result = a + b;
        this.history.push(a + " + " + b + " = " + result);
        return result;
    }
    
    subtract(a, b) {
        const result = a - b;
        this.history.push(a + " - " + b + " = " + result);
        return result;
    }
    
    multiply(a, b) {
        const result = a * b;
        this.history.push(a + " × " + b + " = " + result);
        return result;
    }
    
    divide(a, b) {
        if(b === 0) {
            throw new Error("لا يمكن القسمة على صفر");
        }
        const result = a / b;
        this.history.push(a + " ÷ " + b + " = " + result);
        return result;
    }
    
    getHistory() {
        return this.history;
    }
}

// اختبار الحاسبة
console.log("=== حاسبة متكاملة ===");
const calc = new Calculator();

try {
    console.log("10 + 5 =", calc.add(10, 5));
    console.log("10 - 5 =", calc.subtract(10, 5));
    console.log("10 × 5 =", calc.multiply(10, 5));
    console.log("10 ÷ 5 =", calc.divide(10, 5));
    
    console.log("\\nسجل العمليات:");
    calc.getHistory().forEach((operation, index) => {
        console.log(index + 1 + ". " + operation);
    });
    
} catch(error) {
    console.log("\\nخطأ:", error.message);
}`
    }
];